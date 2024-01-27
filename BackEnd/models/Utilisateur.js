// firestoreModels.js

const utilisateurCollection = 'utilisateurs';

const utilisateurConverter = {
  toFirestore: function (utilisateur) {
    return {
      Nom: utilisateur.Nom,
      Prenom: utilisateur.Prenom,
      Email: utilisateur.Email,
      Mot_de_passe: utilisateur.Mot_de_passe,
      Type: utilisateur.Type,
      Parent_Valide: utilisateur.Parent_Valide,
      Categorie: utilisateur.Categorie
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return {
      Nom: data.Nom,
      Prenom: data.Prenom,
      Email: data.Email,
      Mot_de_passe: data.Mot_de_passe,
      Type: data.Type,
      Parent_Valide: data.Parent_Valide,
      Categorie: data.Categorie
    };
  }
};

module.exports = {
  utilisateurCollection,
  utilisateurConverter
};
