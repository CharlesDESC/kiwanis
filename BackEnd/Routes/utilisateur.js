const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const utilisateursCollection = db.collection('utilisateurs');

  router.post('/api/utilisateur', async (req, res) => {
    try {
      const newUtilisateur = await utilisateursCollection.add(req.body);
      res.status(201).json({ message: 'Utilisateur enregistré !', id: newUtilisateur.id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/api/utilisateur/:id', async (req, res) => {
    try {
      const utilisateur = await utilisateursCollection.doc(req.params.id).get();
      if (!utilisateur.exists) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      } else {
        res.status(200).json(utilisateur.data());
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/api/utilisateur', async (req, res) => {
    try {
      const utilisateurs = [];
      const snapshot = await utilisateursCollection.get();
      snapshot.forEach(doc => {
        utilisateurs.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json(utilisateurs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/api/utilisateur/:id', async (req, res) => {
    try {
      await utilisateursCollection.doc(req.params.id).update(req.body);
      res.status(200).json({ message: 'Utilisateur modifié !' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.delete('/api/utilisateur/:id', async (req, res) => {
    try {
      await utilisateursCollection.doc(req.params.id).delete();
      res.status(200).json({ message: 'Utilisateur supprimé !' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};
