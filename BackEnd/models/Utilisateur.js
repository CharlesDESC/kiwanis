const mongoose = require('mongoose');
const utilisateurSchema = mongoose.Schema({
    Utilisateur_ID: { type: Number, required: true },
    Nom: { type: String },
    Prenom: { type: String },
    Email: { type: String },
    Mot_de_passe: { type: String },
    Type: { type: String, enum: ['enfant', 'visiteur', 'administrateur'] },
    Parent_Valide: { type: Boolean },
    Categorie: { type: String, enum: ['Ecoliers', 'Collegiens', 'Lyceens'] }
});
module.exports = mongoose.model('Utilisateur', utilisateurSchema);
