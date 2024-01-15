const mongoose = require('mongoose');
const commercantSchema = mongoose.Schema({
    Commerce_ID: { type: Number, required: true },
    Nom_du_commerce: { type: String },
    Adresse: { type: String },
    Latitude: { type: Number },
    Longitude: { type: Number }
});
module.exports = mongoose.model('Commercant', commercantSchema);
