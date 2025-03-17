const express = require("express");
const AdminSettings = require("../models/adminSetting");
const verifyAdmin = require("../middleware/authMiddleware");

const router = express.Router();

/* Récupérer les paramètres du site */
router.get("/settings", async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = new AdminSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

/* Modifier les paramètres (Réservé à l'admin) */
router.patch("/settings/update", verifyAdmin, async (req, res) => {
    try {
      let settings = await AdminSettings.findOne();
      if (!settings) {
        settings = new AdminSettings();
      }
      const updates = req.body
      // Mise à jour des valeurs envoyées
      Object.keys(updates).forEach((key) => {
        if (updates[key] !== undefined) {
          settings[key] = updates[key];
        }
      });
  
      await settings.save();
      res.json({ message: "Paramètres mis à jour avec succès" });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
  

module.exports = router;
