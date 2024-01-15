const express = require('express');
const router = express.Router();

router.post('/api/vote', (req, res, next) => {
    delete req.body._id;
    const vote = new Vote({
      ...req.body
    });
    Vote.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  router.get('/api/vote/:id', (req, res, next) => {
    Vote.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

  router.put('/api/vote/:id', (req, res, next) => {
    Vote.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  router.delete('/api/vote/:id', (req, res, next) => {
    Vote.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });


module.exports = router;