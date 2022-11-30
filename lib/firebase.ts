// Import the functions you need from the SDKs you need

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApSfzKVNaIw29aIFFHlUiXcyAh40q7gew",
  authDomain: "nextfire-app-249db.firebaseapp.com",
  projectId: "nextfire-app-249db",
  storageBucket: "nextfire-app-249db.appspot.com",
  messagingSenderId: "334592210423",
  appId: "1:334592210423:web:985d915cb70591d49a6af2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
// export const firestore = firebase.firestore();
// export const storage = firebase.storage();
