"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminOptions() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    title: "",
    email: "",
    phone: "",
    address: "",
    colors: {
      navbar: "#2563eb",
      body: "#ffffff",
      footer: "#1f2937",
      footerBottom: "#111827",
      infoBarColor: "#008000",
      infoBarTextColor: "#ffffff"
    },
    infoBar: "",
    showInfoBar: false
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Charger les paramètres actuels
  useEffect(() => {
    axios.get("/api/admin/settings", { withCredentials: true })
      .then((res) => setSettings(res.data))
      .catch(() => setError("Impossible de charger les paramètres"));
  }, []);

  // Mettre à jour les champs
  const handleChange = (e) => {
    const { name, value,type, checked } = e.target;
    if (name.includes("colors.")) {
      const colorKey = name.split(".")[1];
      setSettings((prev) => ({
        ...prev, // pour conserver les ancienne valeur de settings pour changer que ce qui a une valeur 
        colors: { ...prev.colors, [colorKey]: value }
      }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  // Envoyer la mise à jour
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("/api/admin/settings/update", settings, { withCredentials: true });
      setMessage("Paramètres mis à jour avec succès !");
    } catch (error) {
        setError("Erreur lors de la mise à jour.");
    }
  };
  // 🔥 Annuler la modification et revenir à la liste des blogs
  const handleCancel = () => {
    router.push("/admin");
};

  return (
    <div className="admin-gestions-container options">
      <h2 className="admin-title">Paramètres du Site</h2>

      {message && <p className="admin-success-message">{message}</p>}
      {error && <p className="admin-error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="admin-gestions-form">
        {/* 📝 Informations générales */}
        <div className="admin-gestions-section">
          <h3>📌 Informations Générales</h3>
          <input type="text" name="title" placeholder="Titre du site*" value={settings.title || ""} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email de contact*" value={settings.email || ""} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Numéro de téléphone*" value={settings.phone || ""} onChange={handleChange} />
          <input type="text" name="address" placeholder="Adresse*" value={settings.address || ""} onChange={handleChange} />
        </div>

        {/* 🎨 Couleurs du site */}
        <div className="admin-gestions-section">
          <h3>Personnalisation des couleurs</h3>
          <label>Couleur de la Navbar</label>
          <input type="color" name="colors.navbar" value={settings.colors.navbar || "#2563eb"} onChange={handleChange} />
          
          <label>Couleur du Body</label>
          <input type="color" name="colors.body" value={settings.colors.body || "#ffffff"} onChange={handleChange} />
          
          <label>Couleur du Footer</label>
          <input type="color" name="colors.footer" value={settings.colors.footer || "#1f2937"} onChange={handleChange} />
          
          <label>Couleur du Bas du Footer</label>
          <input type="color" name="colors.footerBottom" value={settings.colors.footerBottom || "#111827"} onChange={handleChange} />
        </div>

        {/* ℹ️ Barre d'information */}
        <div className="admin-gestions-section">
          <h3>Barre d'information</h3>
          <label>
            <input type="checkbox" name="showInfoBar" checked={settings.showInfoBar ?? false} onChange={handleChange} />
            Afficher la barre d'information
          </label>

          <input type="text" name="infoBar" placeholder="Texte de la barre d'information" value={settings.infoBar || ""} onChange={handleChange} />

          <label>Couleur de la barre</label>
          <input type="color" name="colors.infoBarColor" value={settings.colors.infoBarColor || "#008000"} onChange={handleChange} />

          <label>Couleur du texte</label>
          <input type="color" name="colors.infoBarTextColor" value={settings.colors.infoBarTextColor || "#ffffff"} onChange={handleChange} />
        </div>

        {/* 📝 Bouton de validation */}
        <div className="button-container">
            <button type="submit" className="admin-gestions-submit-btn">Mettre à jour</button>
            <button type="button" className="admin-gestions-cancel-btn" onClick={handleCancel}>Annuler</button>
        </div>
      </form>
    </div>
  );
}