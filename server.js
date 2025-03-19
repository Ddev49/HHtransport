require("dotenv").config();
const next = require("next");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const {connectDb} = require("./config/db");
const crypto = require("crypto");

// express
const server = express()
const port = process.env.PORT || 3000 ;
const env = process.env.NODE_ENV !== "production";

// Pas d'affichage de log 
if (env) {
  console.log("Mode développement activé");
} else {
  console.log = function () {}; // Désactive les logs en prod
}

// Pour Next.js
const app = next({ env, dir: "./views" }); // Next.js est dans "views"
const handle = app.getRequestHandler();

// Connection base de donnée
connectDb() // Connection a la base de donner

server.use(compression()); // Réduit la taille des fichiers envoyés (accélère le chargement)
server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // 🔥 TEMPORAIRE : Permet les scripts inline
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net"
        ],
        styleSrc: ["'self'", "'unsafe-inline'"], // Next.js en a besoin
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "ws:", "wss:"], // Autoriser WebSockets si besoin
      },
    },
  })
);


// Ajoute des protections de sécurité (empêche XSS, CSRF, etc.)
server.use(express.json())
server.use(cookieParser()); //Il permet à Express de lire et manipuler les cookies, notamment pour gérer les sessions utilisateur, plutot que de laisser le font aussi sans occuper cela donne plus de securite
server.use((req, res, next) => {
  res.cookie("SESSION_ID", "randomValue", { httpOnly: true, secure: !env });
  next();
});
server.use(express.urlencoded({ extended: true }));  // sert à analyser (parse) les données envoyées via un formulaire HTML (application/x-www-form-urlencoded) dans le req.body
server.use(express.static(path.join(__dirname, "views",'public')));
server.use("/_next/static",express.static(path.join(__dirname, "views",".next","static"), { maxAge: "365d" }));
// Flavicon
//app.use(favicon(path.join(__dirname, 'public','favicon','hh.ico')));

// Attendre que Next.js soit prêt avant de gérer les requêtes
app.prepare().then(() => {
    // les different Routes
    const blogRoutes = require("./routes/blogRoutes");
    const adminRoutes = require("./routes/adminRoutes");
    const clientRoutes = require("./routes/clientRoutes");
    const adminBlogRoutes = require("./routes/adminBlogRoutes"); 
    const adminSettingRoutes = require("./routes/adminSettingRoutes");
    
    server.use("/api", blogRoutes);
    server.use("/api", clientRoutes);
    server.use("/api/admin", adminRoutes);
    server.use("/api/admin", adminBlogRoutes);
    server.use("/api/admin", adminSettingRoutes)
    
    // Gestion des pages Next.js
    server.all("*", (req, res) => {
        return handle(req, res);
    });
     // Gestion des erreurs Express
     server.use((err, req, res, next) => {
        res.status(504).json({ error: "Erreur interne du serveur" });
    });

    server.listen(port, () => {
        console.log(`Serveur lancé sur http://localhost:${port}`);
    });
});

