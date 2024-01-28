'use strict';
const firebase = require('../db');
const { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('@firebase/firestore');
const Photo = require('../models/Photos');
const firestore = getFirestore(firebase);

const addPhoto = async (req, res, next) => {
    try {
        const data = req.body;
        const docRef = await addDoc(collection(firestore, 'photos'), data);
        console.log('Document written with ID: ', docRef.id);
        res.send('Record saved successfully');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getAllPhotos = async (req, res, next) => {
    try {
        const photosCollection = await getDocs(collection(firestore, 'photos'));
        const photosArray = [];

        if (photosCollection.empty) {
            res.status(400).send('No user records found');
        } else {
            photosCollection.forEach(doc => {
                const photo = new Photo(
                    doc.id,
                    doc.data().image_url,
                    doc.data().format,
                    doc.data().date_de_post,
                    doc.data().utilisateur_Id,
                );
                photosArray.push(photo);
            });
            res.send(photosArray);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getPhoto = async (req, res, next) => {
    try {
        const id = req.params.id;
        const photoRef = doc(firestore, 'photos', id); 
        const photoDoc = await getDoc(photoRef);

        if (!photoDoc.exists()) {
            res.status(404).send('Photo with the given ID not found');
        } else {
            res.send(photoDoc.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updatePhoto = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const photoRef = doc(firestore, 'photos', id);
        await updateDoc(photoRef, data);

        res.send('Photo record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deletePhoto = async (req, res, next) => {
    try {
        const id = req.params.id;
        const photoRef = doc(firestore, 'photos', id);
        await deleteDoc(photoRef);
        res.send('Photo deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(400).send(error.message);
    }
};
module.exports = {
    addPhoto,
    getAllPhotos,
    getPhoto,
    updatePhoto,
    deletePhoto
};
