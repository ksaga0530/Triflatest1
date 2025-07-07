
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
  apiKey: "AIzaSyBIN7HyNUw8xqfcuk2g2CDTJhRC1PD-STU",
  authDomain: "trifla.firebaseapp.com",
  projectId: "trifla",
  storageBucket: "trifla.firebasestorage.app",
  messagingSenderId: "432195541688",
  appId: "1:432195541688:web:771538a2a672218b75b24d",
  measurementId: "G-6CDYW1YWX1"
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
