// firestoreModels.js

const commercantCollection = 'commercants';

const commercantConverter = {
  toFirestore: function (commercant) {
    return {
      Commerce_ID: commercant.Commerce_ID,
      Nom_du_commerce: commercant.Nom_du_commerce,
      Adresse: commercant.Adresse,
      Latitude: commercant.Latitude,
      Longitude: commercant.Longitude
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return {
      Commerce_ID: data.Commerce_ID,
      Nom_du_commerce: data.Nom_du_commerce,
      Adresse: data.Adresse,
      Latitude: data.Latitude,
      Longitude: data.Longitude
    };
  }
};

module.exports = {
  commercantCollection,
  commercantConverter
};
