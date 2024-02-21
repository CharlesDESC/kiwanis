const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {getDoc} = require("firebase/firestore");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.activateAccount = functions.https.onRequest(async (req, res) => {
  const {uid, code} = req.query;
  console.log("Activation request for UID:", uid, "Code:", code);

  try {
    const activationsRef = admin.firestore().collection("emailActivations");
    const query = activationsRef.where("uid", "==", uid)
        .where("activationCode", "==", code);
    const snapshot = await query.get();

    if (snapshot.empty) {
      console.log("No activation for UID:", uid, "Code:", code);
      return res.status(404).send("Invalid or used link.");
    }

    const activationDoc = snapshot.docs[0];
    console.log("Found activation:", activationDoc.id);

    const userRef = admin.firestore().collection("users").doc(uid);
    await userRef.set({activated: true, authorized: true}, {merge: true});
    console.log("User updated:", uid);

    await activationsRef.doc(activationDoc.id).update({authorized: true});
    console.log("Activation updated:", uid);

    res.send("Account activated!");
  } catch (error) {
    console.error("Activation error for UID:", uid, "Error:", error);
    res.status(500).send("Activation error.");
  }
});

exports.processParentApproval = functions.firestore
    .document("mailActivations/{docId}")
    .onUpdate(async (change, context) => {
      const newValue = change.after.data();
      const {uid, authorized} = newValue;

      if (authorized) {
        const userData = {
          firstName: newValue.firstName,
          lastName: newValue.lastName,
          email: newValue.email,
          phone: newValue.phone,
          category: newValue.category,
          dateOfBirth: newValue.dateOfBirth,
          activated: true,
        };

        getDoc(admin.firestore()
            .collection("mailActivations").doc(uid)).then((doc) => {
          if (doc.exists) {
            admin.firestore().collection("mailActivations")
                .doc(uid).update("authorized", true);
          }
        });

        const userRef = admin.firestore().collection("users").doc(uid);
        const doc = await userRef.get();

        if (!doc.exists) {
          await userRef.set(userData);
        } else {
          console.log("User already exists.");
        }
      }
    });
