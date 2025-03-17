const express = require("express")
const Blog = require("../models/blog")
const verifyAdmin = require("../middleware/authMiddleware");
const router = express.Router()

// async toujours present pour utilisre await (pour faire en sorte de ne pas allez a la suite tant que la ligne await n'est pas bon ) les fonction async retourne toujours des promise
router.post('/create_blogs',verifyAdmin,async (req,res,next)=>{ // Create
    try{
        const { title, content, category, image, subtitles } = req.body;

        // Vérifier si tous les champs obligatoires sont remplis
        if (!title || !content || !category) {
            return res.status(400).json({ error: "Veuillez remplir tous les champs obligatoires (titre, contenu, catégorie)" });
        }

        const existingBlog = await Blog.findOne({ title });
        if (existingBlog) {
            return res.status(400).json({ error: "Le titre de cet article existe déjà" });
        }
        // Vérifier la structure des sous-titres
        if (subtitles && subtitles.length > 0) {
            for (let i = 0; i < subtitles.length; i++) {
                const sub = subtitles[i];
                if (!sub.subtitle || !sub.content) {
                    return res.status(400).json({ error: `Le sous-titre ${i + 1} doit avoir un titre et un contenu` });
                }
                // Vérifier les listes dans les sous-titres
                if (sub.lists && sub.lists.length > 0) {
                    for (let j = 0; j < sub.lists.length; j++) {
                        const list = sub.lists[j];
                        if (!list.title || !list.items || list.items.length === 0) {
                            return res.status(400).json({ error: `La liste ${j + 1} dans le sous-titre ${i + 1} doit avoir un titre et au moins un élément` });
                        }
                    }
                }
            }
        }
        const blog = new Blog(req.body);
        await blog.save()
        res.status(201).json({ message: "Blog crée avec créé avec succès" });
    }catch(e){
        res.status(500).json({ error: "Erreur lors de la création du blog, Veuillez remplir tous les champs obligatoires" });
    }
});

router.patch('/blogs/:id',verifyAdmin,async (req,res,next)=>{ // Update
    try{
        const { title, content, category, image, subtitles } = req.body;
        const blogId = req.params.id;
        // Vérifier si l'article existe
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: "Article introuvable" });
        }

        // Vérifier que les champs obligatoires ne sont pas vides
        if (!title || !content || !category) {
            return res.status(400).json({ error: "Tous les champs obligatoires (titre, contenu, catégorie) doivent être remplis" });
        }

         // Vérifier si un autre article a déjà ce titre (seulement si le titre est modifié)
         if (title && title !== blog.title) {
            const existingBlog = await Blog.findOne({ title });
            if (existingBlog) {
                return res.status(400).json({ error: "Un autre article porte déjà ce titre" });
            }
            blog.title = title; // Met à jour le titre uniquement si c'est valide
        }
        // Vérifier la structure des sous-titres
        if (subtitles && subtitles.length > 0) {
            for (let i = 0; i < subtitles.length; i++) {
                const sub = subtitles[i];
                if (!sub.subtitle || !sub.content) {
                    return res.status(400).json({ error: `Le sous-titre ${i + 1} doit avoir un titre et un contenu` });
                }
                // Vérifier les listes dans les sous-titres
                if (sub.lists && sub.lists.length > 0) {
                    for (let j = 0; j < sub.lists.length; j++) {
                        const list = sub.lists[j];
                        if (!list.title || !list.items || list.items.length === 0) {
                            return res.status(400).json({ error: `La liste ${j + 1} dans le sous-titre ${i + 1} doit avoir un titre et au moins un élément` });
                        }
                    }
                }
            }
        }
        // Mettre à jour les autres champs seulement s'ils sont fournis
        blog.title = title;
        blog.content = content;
        blog.category = category;
        blog.image = image || null;
        blog.subtitles = subtitles || [];
        await blog.save();
        res.status(200).json({ message: "Article mis à jour avec succès", blog });
    } catch(e){
        res.status(500).json({ error: "Erreur serveur " });
    }
});


router.delete('/blogs/:id',verifyAdmin,async (req,res)=>{ // Delete
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if(!blog) return res.status(404).json({ error: "Blog introuvable" });
        res.status(200).json({ message: "Blog supprimé avec succès" });
    } catch(e) {
        res.status(500).json({ error: "Erreur lors de la suppression du blog" });
    }
});

module.exports = router