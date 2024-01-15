const express = require('express');
const router = express.Router();
const utilisateurCtrl= require ('../Controller/utilisateur')

router.post('/api/utilisateur', utilisateurCtrl.createUtilisateur);
router.get('/api/utilisateur', utilisateurCtrl.getAllUtilisateur)
router.get('/api/utilisateur/:id', utilisateurCtrl.getOneUtilisateur);
router.put('/api/utilisateur/:id', utilisateurCtrl.modifyUtilisateur);
router.delete('/api/utilisateur/:id', utilisateurCtrl.deleteUtilisateur);

module.exports = router;