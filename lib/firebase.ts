// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
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
if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
