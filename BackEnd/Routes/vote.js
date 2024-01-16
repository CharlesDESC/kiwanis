const express = require('express');
const router = express.Router();
const voteCtrl= require('../Controller/vote')

router.post('/api/vote', voteCtrl.createVote);

  router.get('/api/vote/:id', voteCtrl.getOneVote);

  router.put('/api/vote/:id', voteCtrl.modifyVote);

  router.delete('/api/vote/:id', voteCtrl.deleteVote);


module.exports = router;