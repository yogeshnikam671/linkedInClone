// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

import { firestore } from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBscMs7vaUZ33nlsDJu_pGK3AZ_1cv6WUs",
  authDomain: "linkedinclone-d5600.firebaseapp.com",
  projectId: "linkedinclone-d5600",
  storageBucket: "linkedinclone-d5600.appspot.com",
  messagingSenderId: "1033275766566",
  appId: "1:1033275766566:web:199ae156cf581a127733e7",
  measurementId: "G-TJLZ9C4NLG"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const fireDb = getFirestore(firebaseApp);

