"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const router = useRouter();
  // États des informations de l'admin
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get("/api/admin/verify-token",{ withCredentials: true }) // sert a envoyer la requete au back pour voir si la personne est connecter et option { withCredentials: true } poir envoyer les cookie aussi 
    .then((res) => {
      if (res.data.valid) {
        console.log(res.data)
        console.log(res.admin)
        setIsAdmin(true);
        setUsername(res.data.admin.username || "");
        setEmail(res.data.admin.email || "");
        setPhone(res.data.admin.phone || "");
      } else {
        throw new Error("Non admin");
      }
    })
    .catch((error) =>{ 
      if (error.response) {
        // Le serveur a répondu avec un code de statut hors de la plage 2xx
        if (error.response.status === 401) {
            // Code 401 signifie "Non autorisé" : l'utilisateur n'est pas authentifié
            sessionStorage.setItem("loginError", "Accès interdit, connexion requise");
            router.replace("/login");
        } else {
            // Gérer d'autres codes d'erreur si nécessaire
            setError(`Erreur : ${error.response.statusText}`);
        }
    } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        setError("Aucune réponse du serveur. Veuillez vérifier votre connexion réseau.");
    } else {
        // Une erreur s'est produite lors de la configuration de la requête
        setError(`Erreur lors de la requête : ${error.message}`);
    }
    })
    .finally(()=> setLoading(false));
  }, []);
  // 🔥 Soumettre les modifications
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentPassword) {
        setError("Veuillez entrer votre mot de passe actuel");
        return;
    }

    try {
        await axios.patch("/api/admin/update", { username, email, phone, currentPassword, newPassword }, { withCredentials: true });
        setSuccessMessage("Informations mises à jour avec succès !");
        setError("");
        setCurrentPassword(""); // Réinitialiser le champ mot de passe actuel
        setNewPassword(""); // Réinitialiser le champ nouveau mot de passe
        setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
        setError(err.response?.data?.error || "Erreur lors de la mise à jour");
    }
  };
  if (loading) return null;

  if (!isAdmin) return null;

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h2>Profil Administrateur</h2>
        <p><strong>Gérez votre compte et mettez à jour vos informations</strong></p>
      </div>

      <div className="profile-form">
        <h2>Modifier mes informations</h2>

        {successMessage && <p className="response-message success">{successMessage}</p>}
        {error && <p className="response-message error">{error}</p>}

        <form onSubmit={handleUpdate}>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Nom d'utilisateur *" />

          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Adresse email *" />

          <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Téléphone *" />

          <input type="password" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required placeholder="Mot de passe actuel *" />

          <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nouveau mot de passe (optionnel)" />

          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
}
