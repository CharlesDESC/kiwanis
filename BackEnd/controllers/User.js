'use strict';

const firebase = require('../db');
const { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const User = require('../models/User');
const firestore = getFirestore(firebase);

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const docRef = await addDoc(collection(firestore, 'users'), data);
        console.log('Document written with ID: ', docRef.id);
        res.send('Record saved successfully');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const usersCollection = await getDocs(collection(firestore, 'users'));
        const usersArray = [];

        if (usersCollection.empty) {
            res.status(400).send('No user records found');
        } else {
            usersCollection.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().nom,
                    doc.data().prenom,
                    doc.data().email,
                    doc.data().type,
                    doc.data().parent_valide,
                    doc.data().categorie
                );
                usersArray.push(user);
            });
            res.send(usersArray);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userRef = doc(firestore, 'users', id); 

        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            res.status(404).send('User with the given ID not found');
        } else {
            res.send(userDoc.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const userRef = doc(firestore, 'users', id); // Assuming 'users' is the collection name
        await updateDoc(userRef, data);

        res.send('Student record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userRef = doc(firestore, 'users', id);
        await deleteDoc(userRef);
        res.send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(400).send(error.message);
    }
};
module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};
