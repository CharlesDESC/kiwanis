// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL2O66dpMe9Ud-M73z_X0tfB7jV8Aj1Is",
  authDomain: "kiwanis-dev.firebaseapp.com",
  projectId: "kiwanis-dev",
  storageBucket: "kiwanis-dev.appspot.com",
  messagingSenderId: "84595452091",
  appId: "1:84595452091:web:ffe957314933210805a19e",
  measurementId: "G-BSBNMN194D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);