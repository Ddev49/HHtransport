"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [subtitles, setSubtitles] = useState([]); // 🔥 Liste dynamique de sous-titres
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    // Vérifier si l'utilisateur est un administrateur
    useEffect(() => {
        axios.get("/api/admin/verify-token", { withCredentials: true })
            .then((res) => {
                if (res.data.valid) {
                    setIsAdmin(true);
                } else {
                    throw new Error("Non autorisé");
                }
            })
            .catch((err) => {if (error.response) {
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

    // 🔥 Ajouter un sous-titre vide
    const addSubtitle = () => {
        setSubtitles([...subtitles, { subtitle: "", content: "", image: "", lists: [] }]);
    };

    // 🔥 Supprimer un sous-titre
    const removeSubtitle = (index) => {
        setSubtitles(subtitles.filter((_, i) => i !== index));
    };

    // 🔥 Mettre à jour un sous-titre
    const updateSubtitle = (index, field, value) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[index][field] = value;
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Ajouter une liste dans un sous-titre
    const addList = (index) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[index].lists.push({ title: "", items: [] });
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Ajouter un élément dans une liste d'un sous-titre
    const addListItem = (subtitleIndex, listIndex) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[subtitleIndex].lists[listIndex].items.push("");
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Mettre à jour un élément de liste
    const updateListItem = (subtitleIndex, listIndex, itemIndex, value) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[subtitleIndex].lists[listIndex].items[itemIndex] = value;
        setSubtitles(updatedSubtitles);
    };
    // 🔥 Supprimer une liste
    const removeList = (subIndex, listIndex) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[subIndex].lists = updatedSubtitles[subIndex].lists.filter((_, i) => i !== listIndex);
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/admin/create_blogs", { title, content, category, image, subtitles }, { withCredentials: true });
            setSuccessMessage("Article créé avec succès !");
            setTimeout(() => router.push("/admin/blogs"), 1000);
        } catch (err) {
            setError("Erreur lors de la création de l'article");
        }
    };
    // 🔥 Annuler la modification et revenir à la liste des blogs
    const handleCancel = () => {
        router.push("/admin/blogs");
    };
    if (loading) return null;
    if (!isAdmin) return null;

    return (
        <div className="admin-gestions-container create-blog">
            <h2 className="admin-title">Créer un article</h2>
            {/* ✅ Affichage du message de succès */}
            {successMessage && <p className="admin-success-message">{successMessage}</p>}
            {error && <p className="admin-error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="admin-gestions-form">
                <div className="admin-gestions-section">
                    <h3>Informations du Blog</h3>
                    <label>Titre</label>
                    <input type="text" placeholder="Titre du Blog" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <label>Contenu</label>
                    <textarea placeholder="Contenue du Blog" value={content} onChange={(e) => setContent(e.target.value)} required />
                    <label>Catégorie</label>
                    <input type="text" placeholder="Catégorie du Blog" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <label>Image</label>
                    <input type="text" placeholder="Image URL (ne pas utiliser pour l'intant)" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                {/* 🔥 Section pour gérer les sous-titres */}
                <div className="admin-gestions-section">
                
                {subtitles.map((subtitle, subIndex) => (
                    <div key={subIndex}>
                        <h2 className="admin-title">Sous-Elements du Blog</h2>
                        <label>Titre</label>
                        <input
                            type="text"
                            placeholder="Sous-titre"
                            value={subtitle.subtitle}
                            onChange={(e) => updateSubtitle(subIndex, "subtitle", e.target.value)}
                            required
                        />
                        <label>Contenu</label>
                        <textarea
                            placeholder="Contenu"
                            value={subtitle.content}
                            onChange={(e) => updateSubtitle(subIndex, "content", e.target.value)}
                            required
                        />
                        <label>Image</label>
                        <input
                            type="text"
                            placeholder="Image URL (ne pas utiliser pour l'intant)"
                            value={subtitle.image}
                            onChange={(e) => updateSubtitle(subIndex, "image", e.target.value)}
                        />
                        <h3 >Listes</h3>
                        {/* 🔥 Gestion des listes */}
                        {subtitle.lists.map((list, listIndex) => (
                            <div key={listIndex}>
                                <label>Titre</label>
                                <input
                                    type="text"
                                    placeholder="Titre de la liste"
                                    value={list.title}
                                    onChange={(e) => {
                                        const updatedSubtitles = [...subtitles];
                                        updatedSubtitles[subIndex].lists[listIndex].title = e.target.value;
                                        setSubtitles(updatedSubtitles);
                                    }}
                                />
                                {list.items.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        <label>Element</label>
                                        <input
                                            key={itemIndex}
                                            type="text"
                                            placeholder="Élément de la liste"
                                            value={item}
                                            onChange={(e) => updateListItem(subIndex, listIndex, itemIndex, e.target.value)}
                                        />
                                    </div>
                                ))}
                                <div className="button-container">
                                    <button type="button" className="admin-gestions-submit-btn2" onClick={() => addListItem(subIndex, listIndex)}>➕ Ajouter un élément</button>
                                    <button type="button" className="admin-gestions-cancel-btn2" onClick={() => removeList(subIndex, listIndex)}>🗑️ Supprimer la liste</button>
                                    </div>
                                <h3>Listes</h3>
                            </div>
                        ))}

                        {/* 🔥 Bouton pour supprimer le sous-titre */}
                        <div className="button-container">
                            <button type="button" className="admin-gestions-submit-btn2" onClick={() => addList(subIndex)}>➕ Ajouter une liste</button>
                            <button type="button" className="admin-gestions-cancel-btn2" onClick={() => removeSubtitle(subIndex)}> ❌ Supprimer ce sous-titre</button>
                        </div>
                    </div>
                ))}
                <button type="button" className="admin-gestions-submit-btn width" onClick={addSubtitle} > ➕ Ajouter un sous-titre</button>
                </div>
                <div className="button-container">
                <button type="submit" className="admin-gestions-submit-btn">Créer l'article</button>
                <button type="button" className="admin-gestions-cancel-btn" onClick={handleCancel}>Annuler</button>
                
                </div>
            </form>
        </div>
    );
}
