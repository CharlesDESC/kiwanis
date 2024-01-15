const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    Photo_ID: { type: Number, required: true },
    Format: { type: String, enum: ['jpeg', 'png'] },
    Date_de_post: { type: Date },
    Utilisateur_ID: { type: Number },
    Chemin_image: { type: String }
});
module.exports = mongoose.model('Photo', photoSchema);
