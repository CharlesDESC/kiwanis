const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.activateAccount = functions.https.onRequest(async (req, res) => {
    const { uid, code } = req.query; // Extrait les paramètres du lien d'activation

    // Vérifiez le code d'activation ici (par exemple, en cherchant le document correspondant dans Firestore)

    // Si valide, mettez à jour le statut d'activation dans Firestore
    await admin.firestore().collection('users').doc(uid).update({
        activated: true,
        authorized: true,
    });

    res.send("Compte activé avec succès!"); // Réponse simple ou redirection vers une page de confirmation
});
