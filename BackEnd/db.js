// C:\laragon\www\KiwanisProject\kiwanis\BackEnd\db.js

const firebase = require('firebase/app');
require('firebase/firestore');

const config = require('./config');
const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;
