const mongoose = require("mongoose");// Pour cree le model (schema) dans la base de donne
const validator = require("validator");

const BlogSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true,
      unique: true,
      validate: {
              validator: (v) => validator.isLength(v,{min:2,max: 40}),
              message: "Email invalide"
            }
          }, // Titre de l'article
    content: { type: String, required: true }, // Contenu principal de l'article
    author: { type: String, default: "H&HTransport" }, // Auteur
    image: { type: String, default: null }, // URL de l'image
    category: { type: String, default: "Transport" }, // Catégorie
    published: { type: Boolean, default: false }, // Statut de publication

    // Sous-titres avec texte associé
    subtitles: [
      {
        subtitle: { type: String, required: true }, // Sous-titre
        content: { type: String, required: true }, // Texte sous ce sous-titre
        image: { type: String, default: null }, // URL de l'image
        lists: [
          {
            title: { type: String, required: true }, // Titre de la liste
            items: [{ type: String, required: true }], // Éléments de la liste
          },
        ],
      },
    ],
  },
  { timestamps: true } // Gère `createdAt` et `updatedAt` automatiquement
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
