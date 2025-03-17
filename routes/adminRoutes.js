const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const verifyAdmin = require("../middleware/authMiddleware");
const Admin = require("../models/admin");

const router = express.Router();
// async toujours present pour utilisre await (pour faire en sorte de ne pas allez a la suite tant que la ligne await n'est pas bon ) les fonction async retourne toujours des promise
// Route d'initialisation : Créer l'admin (exécutable UNE SEULE FOIS)
router.post("/init", async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Vérifier s'il existe déjà un admin
    const adminExists = await Admin.isAdminExists();
    if (adminExists) return res.status(400).json({ error: "Un administrateur existe déjà" });

    // Créer l'admin
    const admin = new Admin({ username, email, phone, password });
    const authToken = await admin.generateAuthTokenAndSaveAdmin()
    // Stocker le token en cookie sécurisé
    res.cookie("token", authToken, { httpOnly: true, secure: false,maxAge: 30*60*1000 }).json({ message: "Administrateur créé avec succès" }); // sauvegarde le token valide dans un cookie secure a false pour le mode dev en prod mettre true 

  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Connexion de l'administrateur
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Vérifier si l'email est renseigné
        if (!email || !password) {
            return res.status(400).json({ error: "Email et mot de passe requis" });
        }
        const admin = await Admin.findAdmin(email, password);
        if (!admin) {
            return res.status(401).json({ error: "Identifiants incorrects" }); // 🔥 Retourner 401 au lieu de 500
        }
        const authToken = await admin.generateAuthTokenAndSaveAdmin();
        // Stocker le token en cookie sécurisé
        res.cookie("token", authToken, { httpOnly: true, secure: false,sameSite: "lax",maxAge: 30*60*1000 }).json({ message: "Connexion réussie" }); // sauvegarde le token valide dans un cookie secure a false pour le mode dev en prod mettre true 

    } catch (err) {
        res.status(500).json({ error: "Erreur serveurs" });
    }
  });
// Vérifier si l'admin est connecté et si le token est valide
router.get("/verify-token", verifyAdmin, (req, res) => {
    
    res.status(200).json({ valid: true, admin: req.admin });
   })
  
// Modifier de l'administrateur
router.patch("/update", verifyAdmin, async (req, res) => {
    try {
        const { username, email, phone, currentPassword, newPassword } = req.body;
        const admin = req.admin; // L'admin connecté

        // Vérifier si le mot de passe actuel est fourni
        if (!currentPassword) {
            return res.status(400).json({ error: "Veuillez entrer votre mot de passe actuel" });
        }
        // Vérifier si le mot de passe actuel est correct
        const isMatch = await admin.compare(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }
        // Vérifier si l'email ou le téléphone existent déjà pour un autre admin
        if (email && email !== admin.email) {
            const emailExists = await Admin.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ error: "Cet email est déjà utilisé" });
            }
            admin.email = email;
        }
        if (phone && phone !== admin.phone) {
            const phoneExists = await Admin.findOne({ phone });
            if (phoneExists) {
                return res.status(400).json({ error: "Ce numéro est déjà utilisé" });
            }
            admin.phone = phone;
        }

        // Modifier uniquement les champs renseignés
        if (username && username !== admin.username) {
            const phoneExists = await Admin.findOne({ username });
            if (phoneExists) {
                return res.status(400).json({ error: "Ce nom est déjà utilisé" });
            }
            admin.username = username;
        }
        if (newPassword) {
            if (newPassword.length < 8) {
                return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères" });
            }
            admin.newPassword = await bcrypt.hash(newPassword, 10);
        }
        await admin.save();
        res.json({ message: "Informations mises à jour avec succès" });

    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la modification" });
    }
});

// Envoyez mail pour reinitialiser le password
router.post("/reset-password", async (req, res) => {
    const { email } = req.body;
  
    // Toujours envoyer une réponse positive, même si l'email n'existe pas
    const message = "Si cette adresse est associée à un administrateur, un email a été envoyé.";
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(200).json({ message });
      }
  
      // Générer un token sécurisé
      const resetToken = crypto.randomBytes(32).toString("hex");
      admin.resetToken = resetToken;
      admin.resetTokenExpiry = Date.now() + 3600000; // Expire dans 1 heure
      await admin.save();
  
      // Configuration du transporteur Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Contenu de l'email
      const resetUrl = `http://localhost:3000/admin/new-password?token=${resetToken}`;
      const htmlContent = `
        <h1>Réinitialisation du mot de passe</h1>
        <p>Bonjour,</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Ce lien expirera dans une heure.</p>
      `;
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Réinitialisation de votre mot de passe",
        html: htmlContent,
      });
  
      res.status(200).json({ message });
    } catch (err) {
      console.error("Erreur d'envoi d'email :", err);
      res.status(500).json({ error: "Erreur lors de la demande de réinitialisation." });
    }
  });

// Reinitialiser le password avec l'adresse du mail
router.post("/new-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const admin = await Admin.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!admin) {
      return res.status(400).json({ error: "Lien invalide ou expiré." });
    }

    // Hasher le nouveau mot de passe
    admin.password = password;
    admin.resetToken = null;
    admin.resetTokenExpiry = null;
    await admin.save();

    res.status(200).json({ message: "Mot de passe modifié avec succès. Vous pouvez maintenant vous connecter." });
  } catch (err) {
    console.error("Erreur lors du changement de mot de passe :", err);
    res.status(500).json({ error: "Erreur lors du changement de mot de passe." });
  }
});

// Déconnexion de l'admin
router.post("/logout",verifyAdmin, async (req, res) => {
    try {
        const token = req.cookies.token; // Récupérer le token actuel
        if (!token) {
            return res.status(400).json({ error: "Aucun token trouvé" });
        }
    
        // Supprimer uniquement le token actuel
        await req.admin.deleteTokenAdmin(token);
    
        // Supprimer le cookie côté client
        res.clearCookie("token").json({ message: "Déconnexion réussie" });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});
module.exports = router;
