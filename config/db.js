const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.set("autoIndex", false); // Empêche MongoDB de créer trop d'index en production

async function connectDb() // Connection a la base de donne(ici mongo atlas)
{
    await mongoose.connect(process.env.MONGO_URL/*,
        {
            useNewUrlParser: true, //Par défaut, MongoDB utilise un ancien analyseur d’URL qui est devenu obsolète. Cette option active le nouvel analyseur d’URL, ce qui évite les avertissements dans la console et assure une meilleure compatibilité avec les nouvelles versions de MongoDB.
            useUnifiedTopology: true, // un nouveau moteur de gestion des connexions pour améliorer la stabilité. Cette option permet d’éviter des erreurs liées aux anciennes méthodes de gestion des connexions.
          }*/
    );
    console.log("Db connecte")
}

module.exports={connectDb}; // exporter la fonction