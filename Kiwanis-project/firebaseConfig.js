// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDdccyOZGWVpHYt0J_VJcw_q3ZEOglsH4M",
	authDomain: "concours-photo-kiwanis.firebaseapp.com",
	projectId: "concours-photo-kiwanis",
	storageBucket: "concours-photo-kiwanis.appspot.com",
	messagingSenderId: "202369102431",
	appId: "1:202369102431:web:c94300a3daec45932061ea",
	measurementId: "G-X0NQ12YGXF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
