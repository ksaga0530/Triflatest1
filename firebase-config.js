
import { initializeApp } from "<https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js>";

import {

  getAuth,

  GoogleAuthProvider,

  signInWithPopup,

  signInWithEmailAndPassword,

  createUserWithEmailAndPassword

} from "<https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js>";

import {

  getFirestore,

  doc,

  setDoc,

  getDoc,

  collection,

  query,

  where,

  getDocs

} from "<https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js>";



const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "YOUR_AUTH_DOMAIN",

  projectId: "YOUR_PROJECT_ID",

  storageBucket: "YOUR_STORAGE_BUCKET",

  messagingSenderId: "YOUR_SENDER_ID",

  appId: "YOUR_APP_ID"

};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);



export {

  auth,

  GoogleAuthProvider,

  signInWithPopup,

  signInWithEmailAndPassword,

  createUserWithEmailAndPassword,

  db,

  doc,

  setDoc,

  getDoc,

  collection,

  query,

  where,

  getDocs

};

