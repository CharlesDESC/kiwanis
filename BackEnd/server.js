const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./kiwanis-photos-firebase-adminsdk-4jkyt-6e6af2f079.json');
require('dotenv').config({ path: '.env.local' });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express();

// Middleware pour autoriser les requêtes depuis n'importe quel domaine (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Utilisation des routes
// ...

module.exports = app;
