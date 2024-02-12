// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
	getAuth,
	initializeAuth,
	getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD5zmWjWVWH0p70BuQj0vTqPY3diuUQLdQ",
	authDomain: "kiwanis-test-dd86f.firebaseapp.com",
	projectId: "kiwanis-test-dd86f",
	storageBucket: "kiwanis-test-dd86f.appspot.com",
	messagingSenderId: "518391517553",
	appId: "1:518391517553:web:eef70c7c9df03cd50426d0",
	measurementId: "G-0MQ3NHTL6B",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

// Export initialized app and auth instance
export { app, auth, db };
