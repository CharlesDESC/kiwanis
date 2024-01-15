const express = require('express');
const router = express.Router();


router.post('/api/commercant', (req, res, next) => {
    delete req.body._id;
    const commercant = new Commercant({
      ...req.body
    });
    Commercant.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  router.get('/api/commercant/:id', (req, res, next) => {
    Commercant.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

  router.put('/api/commercant/:id', (req, res, next) => {
    Commercant.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  router.delete('/api/commercant/:id', (req, res, next) => {
    Commercant.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

  module.exports = router;