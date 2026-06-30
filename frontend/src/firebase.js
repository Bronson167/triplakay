// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBvRNk64PgY1BYhj138r0vnAtcKRzE3upY",
  authDomain: "tibaza-4ef38.firebaseapp.com",
  projectId: "tibaza-4ef38",
  storageBucket: "tibaza-4ef38.firebasestorage.app",
  messagingSenderId: "718269063165",
  appId: "1:718269063165:web:55c688eb8b15b7fb14c394",
  measurementId: "G-MZXZDW38VG"
};

// Initialise l'app Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Optionnel : initialise Firebase Cloud Messaging
export const messaging = getMessaging(firebaseApp);
