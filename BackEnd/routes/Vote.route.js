const express= require('express')
const { addVote, getAllVotes, getVote, updateVote, deleteVote } = require('../controllers/Vote');

const router = express.Router();

router.post('/vote', addVote)
router.get('/', getAllVotes)
router.get('/vote/:id', getVote)
router.put('/vote/:id', updateVote)
router.delete('/vote/:id', deleteVote)

module.exports={
    routes:router
}