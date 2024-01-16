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

// Modèle utilisateur
const utilisateur1 = new Utilisateur({
  Nom: 'Doe',
  Prenom: 'John',
  Email: 'john.doe@example.com',
  Mot_de_passe: 'motdepasse123',
  Type: 'administrateur',
  Parent_Valide: true,
  Categorie: 'Lyceens'
});

const utilisateur2 = new Utilisateur({
  Nom: 'Smith',
  Prenom: 'Jane',
  Email: 'jane.smith@example.com',
  Mot_de_passe: 'password456',
  Type: 'enfant',
  Parent_Valide: false,
  Categorie: 'Collegiens'
});

// Enregistrement des utilisateurs dans la base de données
Promise.all([utilisateur1.save(), utilisateur2.save()])
  .then((savedUsers) => {
      console.log('Utilisateurs enregistrés avec succès:', savedUsers);
      // Faites d'autres opérations ici si nécessaire
  })
  .catch((error) => {
      console.error('Erreur lors de l\'enregistrement des utilisateurs:', error);
  })
  .finally(() => {
      // Déconnexion de la base de données après l'enregistrement
      mongoose.disconnect();
  });


module.exports = app;