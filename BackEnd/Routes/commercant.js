const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const commercantsCollection = db.collection('commercants');

  router.post('/api/commercant', async (req, res) => {
    try {
      const newCommercant = await commercantsCollection.add(req.body);
      res.status(201).json({ message: 'Commerçant enregistré !', id: newCommercant.id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/api/commercant/:id', async (req, res) => {
    try {
      const commercant = await commercantsCollection.doc(req.params.id).get();
      if (!commercant.exists) {
        res.status(404).json({ error: 'Commerçant non trouvé' });
      } else {
        res.status(200).json(commercant.data());
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/api/commercant/:id', async (req, res) => {
    try {
      await commercantsCollection.doc(req.params.id).update(req.body);
      res.status(200).json({ message: 'Commerçant modifié !' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.delete('/api/commercant/:id', async (req, res) => {
    try {
      await commercantsCollection.doc(req.params.id).delete();
      res.status(200).json({ message: 'Commerçant supprimé !' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};
