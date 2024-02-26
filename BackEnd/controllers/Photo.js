'use strict';
const firebase = require('../db');
const { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } = require('@firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('@firebase/storage');
const Photo = require('../models/Photos');
const firestore = getFirestore(firebase);
const storage = getStorage(firebase);

const addPhoto = async (req, res, next) => {
    try {
        const { image } = req.body;
        const currentDate = new Date();
        const dateString = currentDate.toISOString().slice(0, 10); // Obtient la date au format "YYYY-MM-DD"
        const filename = `${dateString}_${image.name}`; // Ajoute la date au nom du fichier
        const imageRef = ref(storage, 'images/' + filename);
        await uploadBytes(imageRef, image.data);
        const imageUrl = await getDownloadURL(imageRef);
        const photoData = {
            imageUrl,
            // Ajoutez d'autres données de photo si nécessaire
        };
        const docRef = await addDoc(collection(firestore, 'photos'), photoData);
        console.log('Document written with ID: ', docRef.id);
        res.send('Record saved successfully');
    } catch (error) {
        console.error('Error adding photo:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllPhotos = async (req, res, next) => {
    try {
        const photosCollection = await getDocs(collection(firestore, 'photos'));
        const photosArray = [];

        if (photosCollection.empty) {
            res.status(400).send('No photo records found');
        } else {
            photosCollection.forEach(doc => {
                const photo = new Photo(
                    doc.id,
                    doc.data().imageUrl,
                    // Ajoutez d'autres données de photo si nécessaire
                );
                photosArray.push(photo);
            });
            res.send(photosArray);
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
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

        if (req.body.image) {
            const { image } = req.body;
            const imageRef = ref(storage, 'images/' + image.name);
            await uploadBytes(imageRef, image.data);
            const imageUrl = await getDownloadURL(imageRef);
            data.imageUrl = imageUrl;
        }

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
        console.error('Error deleting photo:', error);
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
