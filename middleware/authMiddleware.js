// Pour verifier que la personne est bien un admin
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Accès interdit, token manquant" });
  }

  try {
    // Décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier si l'admin existe
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      res.clearCookie("token");
      return res.status(403).json({ error: "Admin introuvable" });
    }

    // Vérifier si le token est encore actif
    const tokenExists = admin.authTokens.some((t) => t.authToken === token);
    if (!tokenExists) {
      res.clearCookie("token");
      return res.status(403).json({ error: "Session expirée, veuillez vous reconnecter" });
    }

    // Tout est bon, on continue
    req.admin = admin;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(403).json({ error: "Token invalide ou expiré" });
  }
};

module.exports = verifyAdmin;

