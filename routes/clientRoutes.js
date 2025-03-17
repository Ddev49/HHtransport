require('dotenv').config(); 
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Route POST pour envoyer un email
router.post('/contact', async (req, res) => {
    const { name, email, phone, address, subject, message } = req.body;
    
    // Valider les données du formulaire
    if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis ne sont pas renseigné ' });
  }
    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        },
    });
    // Contenu de l'e-mail en HTML
    const htmlContent = `
    <h1>Nouveau message de contact de :</h1>
    <p><strong>Nom :</strong> ${name}</p>
    <p><strong>Adresse e-mail :</strong> ${email}</p>
    <p><strong>Téléphone :</strong> ${phone}</p>
    <p><strong>Adresse :</strong> ${address}</p>
    <p><strong>Objet :</strong> ${subject}</p>
    <p><strong>Message :</strong></p>
    <p>${message}</p>
    `;
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: subject,
            html: htmlContent,
        });
            res.status(201).json({ message: "Message bien envoyé à jour. Nous vous répondrons dans les plus brefs délais." });
        } catch (error) {
            res.status(500).json({ message: "Nous avons une maintenances, nous ne pouvons pas recevoir vos message pour l'instant" });
        throw error;
        }
});

module.exports = router;
