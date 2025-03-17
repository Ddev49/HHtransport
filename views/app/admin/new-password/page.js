"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect,Suspense } from "react";
import GetToken from "./GetToken"; // Import du composant Client
import axios from "axios";

export default function NewPassword() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validToken, setValidToken] = useState(true);
  
  useEffect(() => {
    if (token === null) return;
    if (!token) {
      setError("Lien de réinitialisation invalide.");
      setTimeout(() => router.push("/login"), 3000); // Redirection après 3 secondes
      setValidToken(false);
    }
  }, [token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }


    try {
      const res = await axios.post("/api/admin/new-password", { token, password });
      setMessage(res.data.message);
      setTimeout(() => router.push("/login"), 3000); // Redirection après 3 secondes
    } catch (err) {
      setValidToken(false);
      setError("Le lien est invalide ou a expiré.");
    }
  };
  if(!validToken) return (
      <main className="new-password-container">
          <h2>Réinitialiser le mot de passe</h2>
          {error && <p className="error-message">{error}</p>}
      </main>
      )
  return (
    <main className="new-password-container">
      <h2>Changer le mot de passe</h2>
      <Suspense fallback={<p>Chargement...</p>}>
        <GetToken onToken={setToken} />
      </Suspense>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="password-form">
        <div className="input-group">
          <input
            type="password"
            placeholder="Nouveau mot de passe *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Confirmer le mot de passe *"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Changer le mot de passe</button>
      </form>

      <a href="/login" className="back-link">Retour à la connexion</a>
    </main>
  );
}