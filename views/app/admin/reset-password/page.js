"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("/api/admin/reset-password", { email });
      setMessage(res.data.message);
      setTimeout(() => router.push("/login"), 3000); // Redirection après 3 secondes
    } catch (err) {
      setError("Erreur lors de la demande de réinitialisation.");
    }
  };

 return (
    <main className="forgot-password-container">
      <h2>Mot de passe oublié</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="forgot-password-form">
      <label>Email <span className="required">*</span></label>
        <input
          type="email"
          placeholder="Entrez votre adresse e-mail *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Envoyer</button>
      </form>

      <a href="/login" className="back-link">Retour à la connexion</a>
    </main>
  );
}
