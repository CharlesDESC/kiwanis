const express = require('express');
const router = express.Router();
const CommercantCtrl= require('../Controller/commercant')

router.post('/api/commercant', CommercantCtrl.createCommercant );

  router.get('/api/commercant/:id', CommercantCtrl.getOneCommercant );

  router.put('/api/commercant/:id', CommercantCtrl.modifyCommercant);

  router.delete('/api/commercant/:id', CommercantCtrl.deleteCommercant);

  module.exports = router;