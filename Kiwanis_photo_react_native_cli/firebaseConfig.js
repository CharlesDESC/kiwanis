// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyADnlpS8t4J594vkjXSSi6mbgVCSRsEO6I',
  authDomain: 'kiwanis-photos.firebaseapp.com',
  databaseURL:
    'https://kiwanis-photos-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'kiwanis-photos',
  storageBucket: 'kiwanis-photos.appspot.com',
  messagingSenderId: '1097994099722',
  appId: '1:1097994099722:web:ade903e2187b0b0c9393f3',
  measurementId: 'G-CB84SG20Q5',
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

// Export initialized app and auth instance
export {app, auth, db};
