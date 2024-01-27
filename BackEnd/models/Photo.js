// firestoreModels.js

const photoCollection = 'photos';

const photoConverter = {
  toFirestore: function (photo) {
    return {
      Photo_ID: photo.Photo_ID,
      Format: photo.Format,
      Date_de_post: photo.Date_de_post,
      Utilisateur_ID: photo.Utilisateur_ID,
      Chemin_image: photo.Chemin_image
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return {
      Photo_ID: data.Photo_ID,
      Format: data.Format,
      Date_de_post: data.Date_de_post.toDate(), // Firestore Date to JavaScript Date
      Utilisateur_ID: data.Utilisateur_ID,
      Chemin_image: data.Chemin_image
    };
  }
};

module.exports = {
  photoCollection,
  photoConverter
};
