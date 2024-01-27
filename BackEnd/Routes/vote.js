const express = require('express');
const router = express.Router();

module.exports = (db) => {
  const votesCollection = db.collection('votes');

  router.post('/api/vote', async (req, res) => {
    try {
      const newVote = await votesCollection.add(req.body);
      res.status(201).json({ message: 'Vote enregistré !', id: newVote.id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/api/vote/:id', async (req, res) => {
    try {
      const vote = await votesCollection.doc(req.params.id).get();
      if (!vote.exists) {
        res.status(404).json({ error: 'Vote non trouvé' });
      } else {
        res.status(200).json(vote.data());
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/api/vote/:id', async (req, res) => {
    try {
      await votesCollection.doc(req.params.id).update(req.body);
      res.status(200).json({ message: 'Vote modifié !' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.delete('/api/vote/:id', async (req, res) => {
    try {
      await votesCollection.doc(req.params.id).delete();
      res.status(200).json({ message: 'Vote supprimé !' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};
