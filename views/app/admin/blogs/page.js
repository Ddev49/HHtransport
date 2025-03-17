"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

  
export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(null); // 🔥 Stocke l’ID du blog à supprimer
    const [successMessage, setSuccessMessage] = useState(""); // ✅ État pour le message de confirmation
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();

    useEffect(() => {
        axios.get("/api/admin/verify-token", { withCredentials: true })
        .then((res) => {
            if (res.data.valid) {
                setIsAdmin(true);
                return axios.get("/api/blogs")
            }
            else {
                throw new Error("Non admin");
            }
        })
        .then((res) => setBlogs(res.data))
        .catch(() => {
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

    // 🔥 Ouvrir la confirmation de suppression
    const requestDelete = (id) => {
        setConfirmDelete(id);
    };
    // 🔥 Supprimer après confirmation
    const handleDelete = async () => {
        if (!confirmDelete) return;
        try {
            await axios.delete(`/api/admin/blogs/${confirmDelete}`, { withCredentials: true });
            setBlogs(blogs.filter((blog) => blog._id !== confirmDelete));
            setTimeout(() => setSuccessMessage(""), 3000); // 🔥 Effacer après 3 secondes
            setConfirmDelete(null); // 🔥 Fermer la boîte de confirmation après suppression
        } catch (e) {
            setError("Erreur lors de la suppression");
        }
    };
    
    if (loading || !isAdmin) return null;

    return (
        <div className="admin-gestions-container read-blog">
            <h1 className="admin-title">Gestion des Articles</h1>
            {/* Affichage du message de succès */}
            {successMessage && <p className="admin-success-message">{successMessage}</p>}
            {error && <p className="admin-error-message">{error}</p>}
            <button className="admin-gestions-submit-btn width" onClick={() => router.push("/admin/blogs/create")}>➕ Ajouter un article </button>
            {blogs.length === 0 ? (
                <p className="no-articles">Nos Blogs sont actuellement disponible prenez un café le temps de leurs livraisons.</p>
            ) : (
                <div className="blogs-list">
                    {blogs.map((blog) => (
                        <div  key={blog._id} className="blog-card">
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blogs-date">Auteur : {(blog.author)}</p>
                            <p className="blogs-date">Categorie : {(blog.category)}</p>
                            <p className="blogs-date">Date : {new Date(blog.createdAt).toLocaleDateString()}</p>
                            <p className="blog-content">
                                {blog.content.length > 100
                                    ? blog.content.substring(0, 100) + "..."
                                    : blog.content}
                            </p>
                            <div className="button-container">
                                <button className="admin-gestions-submit-btn" onClick={() => router.push(`/admin/blogs/edit/${blog._id}`)}>Modifier</button>
                                <button className="admin-gestions-cancel-btn" onClick={() => requestDelete(blog._id)}>Supprimer </button>
                            </div>
                            {/* 🔥 Fenêtre de confirmation de suppression */}
                            {confirmDelete == blog._id &&  (
                                <div >
                                        <p className="bold">Êtes-vous sûr de vouloir supprimer cet article ?</p>
                                        <div className="button-container">
                                            <button className="admin-gestions-submit-btn"  onClick={() => setConfirmDelete(null)}>Annuler</button>
                                            <button className="admin-gestions-cancel-btn" onClick={handleDelete}>Supprimer</button>
                                        </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
