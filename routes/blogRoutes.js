const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();
router.get('/blogs',async (req,res,next)=>{ // Read All
    try{
        const blogs = await Blog.find({}).sort({ createdAt: -1 }); //element a rechercher/ Tri du plus récent au plus ancien
        if(!blogs)  
            return res.status(201).json([]);
        res.status(201).json(blogs);
    }catch(e){
        res.status(500).json({ error: "Erreur serveur" });
    }

});
router.get('/blogs/:id',async (req,res,next)=>{ // Read one
    try{
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId); //element a rechercher
        if(!blog) res.status(401).json("ce blog n'est plus disponible");
        res.status(201).json(blog);
    }catch(e){
        res.status(500).json({ error: "Erreur serveur" });
    }
});
module.exports = router;