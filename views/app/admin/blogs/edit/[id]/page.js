"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditBlog() {
    const router = useRouter();
    const { id } = useParams(); // Récupère l'ID du blog dans l'URL

    // États des champs
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [subtitles, setSubtitles] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // Charger les données du blog
    useEffect(() => {
        axios.get("/api/admin/verify-token", { withCredentials: true })
            .then((res) => {
                if (res.data.valid) {
                    setIsAdmin(true);
                    return axios.get(`/api/blogs/${id}`);
                } else {
                    throw new Error("Non admin");
                }
            })
            .then((res) => {
                const blog = res.data;
                setTitle(blog.title || "");
                setContent(blog.content || "");
                setCategory(blog.category || "");
                setImage(blog.image || "");
                setSubtitles(blog.subtitles || []);
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
    }, [id]);

    // 🔥 Ajouter un sous-titre vide
    const addSubtitle = () => {
        setSubtitles([...subtitles, { subtitle: "", content: "", image: "", lists: [] }]);
    };

    // 🔥 Mettre à jour un sous-titre
    const updateSubtitle = (index, field, value) => {
        const updatedSubtitles = subtitles.map((sub, i) =>
            i === index ? { ...sub, [field]: value } : sub
        );
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Supprimer un sous-titre
    const removeSubtitle = (index) => {
        setSubtitles(subtitles.filter((_, i) => i !== index));
    };

    // 🔥 Ajouter une liste à un sous-titre
    const addListToSubtitle = (subIndex) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[subIndex].lists = [...updatedSubtitles[subIndex].lists, { title: "", items: [""] }];
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Modifier une liste
    const updateList = (subIndex, listIndex, field, value) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[subIndex].lists[listIndex][field] = value;
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Ajouter un élément à une liste
    const addItemToList = (subIndex, listIndex) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[subIndex].lists[listIndex].items = [...updatedSubtitles[subIndex].lists[listIndex].items, ""];
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Modifier un élément d'une liste
    const updateListItem = (subIndex, listIndex, itemIndex, value) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[subIndex].lists[listIndex].items[itemIndex] = value;
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Supprimer une liste
    const removeList = (subIndex, listIndex) => {
        const updatedSubtitles = [...subtitles];
        updatedSubtitles[subIndex].lists = updatedSubtitles[subIndex].lists.filter((_, i) => i !== listIndex);
        setSubtitles(updatedSubtitles);
    };

    // 🔥 Soumettre les modifications
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/admin/blogs/${id}`, { title, content, category, image, subtitles }, { withCredentials: true });
            setSuccessMessage("Article Modifier avec succès !");
            setTimeout(() => router.push("/admin/blogs"), 1000);
        } catch (err) {
            setError("Erreur lors de la modification de l'article");
        }
    };

    // 🔥 Annuler la modification et revenir à la liste des blogs
    const handleCancel = () => {
        router.push("/admin/blogs");
    };
    if (loading ||!isAdmin) return null;

    return (
        <div className="admin-gestions-container edit-blog">
            <h2 className="admin-title">Modifier l'article</h2>
            {/* ✅ Affichage du message de succès */}
            {successMessage && <p className="admin-success-message">{successMessage}</p>}
            {error && <p className="admin-error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="admin-gestions-form">
                <div className="admin-gestions-section">
                    <h3>Informations du Blog</h3>
                    <label>Titre</label>
                    <input type="text" placeholder="Titre du Blog" value={title || ""} onChange={(e) => setTitle(e.target.value)} required />
                    <label>Contenu</label>
                    <textarea placeholder="Contenue du Blog" value={content || ""} onChange={(e) => setContent(e.target.value)} required />
                    <label>Catégorie</label>
                    <input type="text" placeholder="Catégorie du Blog" value={category || ""} onChange={(e) => setCategory(e.target.value)} />
                    <label>Image</label>
                    <input type="text" placeholder="Image URL (ne pas utiliser pour l'intant)" value={image || ""} onChange={(e) => setImage(e.target.value)} />
                </div>

                {/* 🔥 Section pour gérer les sous-titres */}
                <div className="admin-gestions-section">
                    {subtitles.map((subtitle, subIndex) => (
                        <div key={subIndex}>
                        <h3 >Sous-Elements du Blog</h3>
                            <label>Titre</label>
                            <input type="text" placeholder="Sous-titre" value={subtitle.subtitle || ""} onChange={(e) => updateSubtitle(subIndex, "subtitle", e.target.value)} required />
                            <label>Contenu</label>
                            <textarea placeholder="Contenu" value={subtitle.content || ""} onChange={(e) => updateSubtitle(subIndex, "content", e.target.value)} required />
                            <label>Image</label>
                            <input type="text" placeholder="Image URL (ne pas utiliser pour l'intant)" value={subtitle.image || ""} onChange={(e) => updateSubtitle(subIndex, "image", e.target.value)} />
                            {/* 🔥 Gestion des listes */}
                            <h3 >Listes</h3>
                            {subtitle.lists.map((list, listIndex) => (
                                <div key={listIndex}>
                                    <label>Titre</label>
                                    <input type="text" placeholder="Titre de la liste" value={list.title || ""} onChange={(e) => updateList(subIndex, listIndex, "title", e.target.value)} required />
                                    {list.items.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            <label>Element</label>
                                            <input key={itemIndex} type="text" placeholder="Élément de liste" value={item || ""} onChange={(e) => updateListItem(subIndex, listIndex, itemIndex, e.target.value)} required />
                                        </div>
                                    ))}
                                    <div className="button-container">
                                        <button type="button" className="admin-gestions-submit-btn2" onClick={() => addItemToList(subIndex, listIndex)}>➕ Ajouter un élément</button>
                                        <button type="button" className="admin-gestions-cancel-btn2" onClick={() => removeList(subIndex, listIndex)}>🗑️ Supprimer la liste</button>
                                    </div>
                                    <h3>Listes</h3>
                                </div>
                            ))}
                            <div className="button-container">
                                <button type="button" className="admin-gestions-submit-btn2" onClick={() => addListToSubtitle(subIndex)}>➕ Ajouter une liste</button>
                                <button type="button" className="admin-gestions-cancel-btn2" onClick={() => removeSubtitle(subIndex)}>🗑️ Supprimer le sous-titre</button>
                            </div>                        
                        </div>
                    ))}
                    <button type="button" className="admin-gestions-submit-btn width" onClick={addSubtitle}>➕ Ajouter un sous-titre</button>

                </div>


                {/* 🔥 Boutons */}
                <div className="button-container">
                    <button type="submit" className="admin-gestions-submit-btn">Modifier</button>
                    <button type="button" className="admin-gestions-cancel-btn" onClick={handleCancel}>Annuler</button>
                </div>
            </form>
        </div>
    );
}
