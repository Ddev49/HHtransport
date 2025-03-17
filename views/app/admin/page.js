"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
  
export default function AdminBlogs() {
    
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();

    const navigationItems = [
        { label: "Gérer les blogs", path: "/admin/blogs", description: "Ajoutez, modifiez ou supprimez des articles." },
        { label: "Options", path: "/admin/options", description: "Personnalisez les paramètres du site." },
        { label: "Modifier le profil", path: "/admin/profil", description: "Mettez à jour vos informations d'administrateur." },
    ];;

    useEffect(() => {
        axios.get("/api/admin/verify-token", { withCredentials: true })
        .then((res) => {
            if (res.data.valid) {
                setIsAdmin(true);
            }
            else {
                throw new Error("Non admin");
            }
        })
        .catch((error) => {
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
        .finally(() => setLoading(false));
    }, []);
    
    if (loading) return null;
    if (!isAdmin) return null;

    return (
        <div className="admin-dashboard">
            {/* Titre et boîte de bienvenue */}
            <div className="admin-welcome">
            <h1 className="dashboard-title">Tableau de Bord </h1>
                <h2>Bienvenue sur votre espace </h2>
                <p>Gérez facilement le contenu et les paramètres du site.</p>
            </div>

            {/* Section navigation */}
            <div className="admin-actions">
                {navigationItems.map((item) => (
                    <button
                        key={item.path}
                        className="admin-button"
                        onClick={() => router.push(item.path)}
                    >
                        <span className="button-label">{item.label}</span>
                        <span className="button-desc">{item.description}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
