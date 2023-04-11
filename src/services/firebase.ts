// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQWi0E8nIoIXY9oRo2wI9UmjRgIZHujO4",
  authDomain: "earlybird-e78dd.firebaseapp.com",
  projectId: "earlybird-e78dd",
  storageBucket: "earlybird-e78dd.appspot.com",
  messagingSenderId: "291057484539",
  appId: "1:291057484539:web:c87fc9d10c8198de3da65e",
  measurementId: "G-25WHNYNKT3"
};

initializeApp(firebaseConfig)

export const auth = getAuth();

export const register = (email: string, password: string) => 
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const db = getFirestore();
