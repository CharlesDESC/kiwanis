const mongoose = require('mongoose');
const voteSchema = mongoose.Schema({
    Vote_ID: { type: Number, required: true },
    Utilisateur_ID: { type: Number },
    Photo_ID: { type: Number },
    Date_du_vote: { type: Date }
});
module.exports = mongoose.model('Vote', voteSchema);
