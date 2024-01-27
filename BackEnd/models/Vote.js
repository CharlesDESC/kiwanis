// firestoreModels.js

const voteCollection = 'votes';

const voteConverter = {
  toFirestore: function (vote) {
    return {
      Utilisateur_ID: vote.Utilisateur_ID,
      Photo_ID: vote.Photo_ID,
      Date_du_vote: vote.Date_du_vote
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return {
      Utilisateur_ID: data.Utilisateur_ID,
      Photo_ID: data.Photo_ID,
      Date_du_vote: data.Date_du_vote.toDate() // Firestore Date to JavaScript Date
    };
  }
};

module.exports = {
  voteCollection,
  voteConverter
};
