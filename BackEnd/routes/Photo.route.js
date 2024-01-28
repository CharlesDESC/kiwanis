const express= require('express')
const {addUser, getAllUsers, getUser, updateUser, deleteUser}=require('../controllers/User');
const { addPhoto, getAllPhotos, getPhoto, updatePhoto, deletePhoto } = require('../controllers/Photo');

const router = express.Router();

router.post('/photo', addPhoto)
router.get('/', getAllPhotos)
router.get('/photo/:id', getPhoto)
router.put('/photo/:id', updatePhoto)
router.delete('/photo/:id', deletePhoto)

module.exports={
    routes:router
}