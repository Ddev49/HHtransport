"use client";
import "./css/404.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirection automatique vers l'accueil après 5 secondes
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
      <div className="admin-gestions-container not-found">
        <h1 className="admin-title">Oups, cette page n’existe pas !</h1>
        <p>
          Il semble que cette page ait été déplacée ou n'existe plus. Chez H&H Transport, nous nous assurons 
          que chaque trajet est sécurisé et optimisé. Malheureusement, cette page a pris une mauvaise direction.
        </p>

        <p>
          Vous serez automatiquement redirigé vers la page d'accueil sous peu. Si vous souhaitez y accéder immédiatement, cliquez sur le bouton ci-dessous.
        </p>

        <button onClick={() => router.push("/")} className="admin-gestions-submit-btn btn-center">
          Retour à l'accueil
        </button>
      </div>
  );
}
