const mongoose = require("mongoose"); // Pour cree le model (schema) dans la base de donne
const bcrypt = require("bcryptjs"); // pour crypter le mots de pass (plus de securite)
const jwt = require("jsonwebtoken"); // sert a donner un token a une personne connecter pour qu'il soit considerer comme connecter et peut avoir acces a des route specifique 
const validator = require("validator");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
        validator: (v) => validator.isEmail(v),
        message: "Email invalide"
      }},
  phone: { 
    type: String,
    unique: true, 
    validate: {
        validator: (v) => validator.isMobilePhone(v, "fr-FR"),
        message: "Numéro de téléphone invalide ou non français"
      }
   },
  password: { 
    type: String, 
    required: true,
    validate: {
        validator: (v) => validator.isLength(v, { min: 8,max: 120}),
        message: "Le mot de passe doit contenir entre 8 "
      }
   },
   // Sert pour la connection a plusieur endroit 3 max
   authTokens: [{ 
        authToken:{
            type: String, 
            required: true
        }
    }],
    // Champs pour la réinitialisation du mot de passe
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
    
},{
    // Suprimme ces champs quand un admin est envoyer en json + securité (les autre champs j'en aurait besoin) 
    toJSON: {
        transform: function (doc, ret) {
            delete ret.authTokens;
            return ret;
        }
    }
});

// Hachage du mot de passe avant la sauvegarde
AdminSchema.pre("save", async function () { // pour hasher le mots de passse avnt qui soit mis dans la base de donner (fonction qui s'execute avant (pre) la fonction save )
  if (this.isModified("password")) 
    this.password = await bcrypt.hash(this.password, 10); // il modified pour voir si il ya une creation ou un changement de mots de passe sinon ne sert a rien 
});
 // Générer un token JWT
AdminSchema.methods.generateAuthTokenAndSaveAdmin = async function()
{
    // Nettoyer les tokens expirés
    this.authTokens = this.authTokens.filter(tokenObj => {
        try {
            jwt.verify(tokenObj.authToken, process.env.JWT_SECRET);
            return true; // Garde le token s'il est valide
        } catch (err) {
            return false; // Supprime le token s'il est expiré ou invalide
        }
    });
    const authToken = jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1h" }); //servira pour savoir si l'utilisateur est connecter on pourrai faire une fonction instance du modele admin et l'utiliser ici et dans la fonction registre pour que cela une fois qui s'incrit soit directement connecter
    if(this.authTokens.length >= 3){ // verifie que il n'y a pas plus de 3 connection instantaner
        // Supprimer le plus ancien token
        this.authTokens.shift();
    }
    this.authTokens.push({ authToken }); // ajoute le recent 

    await this.updateOne({ $set: { authTokens: this.authTokens } });  
    return authToken;
}
// Supprimer un token JWT spécifique
AdminSchema.methods.deleteTokenAdmin = async function (token) {
    this.authTokens = this.authTokens.filter((t) => t.authToken !== token);
    await this.save();
};

// Supprimer un token JWT spécifique
AdminSchema.methods.deleteTokenAdmin = async function (token) {
    this.authTokens = this.authTokens.filter((t) => t.authToken !== token);
    await this.save();
};
// Comparer Mots de passe et mots de passe crypte
AdminSchema.methods.compare = async function (password) {
    return await bcrypt.compare(password, this.password)
};
// Vérification s'il y a déjà un admin avant d'enregistrer un nouveau
AdminSchema.statics.isAdminExists = async function () {
  const count = await this.countDocuments();
  return count > 0;
};
AdminSchema.statics.findAdmin = async (email,password) =>{
    const admin = await Admin.findOne({email})
    if (!admin || !(await admin.compare(password))) {
        return null;//NUll ??
    }
    return admin
}

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;


/*
"email": "admin@example.com",
  "phone": "0601020304",
  "password": "admin123"
  */