"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/admin/verify-token", { withCredentials: true });
        if (response.data.valid) {
          router.replace("/admin");
        }
      }catch(e){
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
    // 🔥 Récupérer le message d'erreur depuis sessionStorage
    const loginError = sessionStorage.getItem("loginError");
    if (loginError) {
      setError(loginError);
      sessionStorage.removeItem("loginError"); // 🔥 Supprimer l'erreur après affichage
    }
  }, [router])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/login", { email, password }, { withCredentials: true });
      console.log("✅ Réponse reçue :", response.data);
        document.cookie.split(";").forEach(cookie => console.log("🍪 Cookie présent :", cookie));
      router.push("/admin");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la connexion.");
    }
  };
  if (loading)  return null;
  return (
    <div className="login-page">
      {/* Bloc d'informations */}
      <div className="login-info">
        <h2>Bienvenue sur l'espace administrateur</h2>
        <p>Accédez à votre tableau de bord et gérez votre contenu en toute simplicité.</p>
        <p><strong>Besoin d'aide ?</strong> Contactez notre support.</p>
      </div>

      {/* Formulaire de connexion */}
      <div className="login-form">
        <h2>Connexion Admin</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Email <span className="required">*</span></label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Votre email..." />

          <label>Mot de passe <span className="required">*</span></label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Votre mot de passe..." />

          <button type="submit">Se connecter</button>
        </form>
        <p className="forgot-password">
          <Link href="/admin/reset-password">Mot de passe oublié ?</Link>
        </p>
      </div>
    </div>
  );
}
