const mongoose = require("mongoose");

const AdminSettingsSchema = new mongoose.Schema({
  title: { type: String, default: "H&H Transport" }, // Titre du site
  email: { type: String, default: "contact@hhtransport.com" }, // Email de contact
  phone: { type: String, default: "+33 7 49 89 46 24" }, // Numéro de téléphone
  address: { type: String, default: "123 Rue Exemple, 49000 Angers" }, // Adresse
  infoBar: { type: String, default: "Livraison rapide et sécurisée avec H&H Transport !" }, // Texte de la barre d'information
  showInfoBar: { type: Boolean, default: false }, // montre la bare ou non
  colors: {
    navbar: { type: String, default: "#2563eb" }, // Couleur de la navbar
    body: { type: String, default: "#ffffff" }, // Couleur du body
    footer: { type: String, default: "#1f2937" }, // Couleur du footer
    footerBottom: { type: String, default: "#111827" }, // Couleur de la partie basse du footer
    infoBarColor: { type: String, default: "#008000" },
    infoBarColorText: { type: String, default: "#FFFFFF" }
  }
});

const AdminSettings = mongoose.model("AdminSettings", AdminSettingsSchema);
module.exports = AdminSettings;
