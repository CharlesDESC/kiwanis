'use strict';
const firebase = require('../db');
const { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('@firebase/firestore');
const Vote = require('../models/Vote');
const firestore = getFirestore(firebase);

const addVote = async (req, res, next) => {
    try {
        const data = req.body;
        const docRef = await addDoc(collection(firestore, 'votes'), data);
        console.log('Document written with ID: ', docRef.id);
        res.send('Record saved successfully');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getAllVotes = async (req, res, next) => {
    try {
        const votesCollection = await getDocs(collection(firestore, 'votes'));
        const votesArray = [];

        if (votesCollection.empty) {
            res.status(400).send('No vote records found');
        } else {
            votesCollection.forEach(doc => {
                const vote = new Vote(
                    doc.id,
                    doc.data().utilisateur_Id,
                    doc.data().photo_Id,
                    doc.data().date_de_vote,
                );
                votesArray.push(vote);
            });
            res.send(votesArray);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getVote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const voteRef = doc(firestore, 'votes', id); 
        const voteDoc = await getDoc(voteRef);

        if (!voteDoc.exists()) {
            res.status(404).send('Vote with the given ID not found');
        } else {
            res.send(voteDoc.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateVote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const voteRef = doc(firestore, 'votes', id);
        await updateDoc(voteRef, data);

        res.send('Vote record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteVote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const voteRef = doc(firestore, 'votes', id);
        await deleteDoc(voteRef);
        res.send('Vote deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(400).send(error.message);
    }
};
module.exports = {
    addVote,
    getAllVotes,
    getVote,
    updateVote,
    deleteVote
};
