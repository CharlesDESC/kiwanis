const express = require('express');
const photoCtrl= require ('../Controller/photo');
const router = express.Router();

router.post('/api/photo', photoCtrl.createPhoto );

  router.get('/api/photo/:id', photoCtrl.getOnePhoto);

  router.put('/api/photo/:id', photoCtrl.modifyPhoto );

  router.delete('/api/photo/:id', photoCtrl.deletePhoto );

module.exports = router;