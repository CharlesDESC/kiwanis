const express = require('express');
const mongoose = require('mongoose');
const photoRoute = require('./Routes/photo')
const voteRoute= require('./Routes/vote')
const utilisateurRoute= require('./Routes/utilisateur')
const commercantRoute= require('./Routes/commercant')
const Utilisateur=require('./models/Utilisateur')


const app = express();

mongoose.connect('mongodb+srv://mahautwindal:kZTLTbN1ExXYOmcc@kywanisproject.b4zuree.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/photo', photoRoute);
  app.use('/api/vote', voteRoute);
  app.use('/api/utilisateur', utilisateurRoute);
  app.use('/api/commercant', commercantRoute);
  app.use('/api/auth',utilisateurRoute)

module.exports = app;