const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const photosCollection = db.collection('photos');

  // Route pour créer une photo
  router.post('/api/photo', async (req, res) => {
    try {
      const newPhoto = await photosCollection.add(req.body);
      res.status(201).json({ message: 'Photo enregistrée !', id: newPhoto.id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Route pour récupérer une photo spécifique
  router.get('/api/photo/:id', async (req, res) => {
    try {
      const photo = await photosCollection.doc(req.params.id).get();
      if (!photo.exists) {
        res.status(404).json({ error: 'Photo non trouvée' });
      } else {
        res.status(200).json(photo.data());
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route pour modifier une photo
  router.put('/api/photo/:id', async (req, res) => {
    try {
      await photosCollection.doc(req.params.id).update(req.body);
      res.status(200).json({ message: 'Photo modifiée !' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Route pour supprimer une photo
  router.delete('/api/photo/:id', async (req, res) => {
    try {
      await photosCollection.doc(req.params.id).delete();
      res.status(200).json({ message: 'Photo supprimée !' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};
