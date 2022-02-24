// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSaVLftWIbNKLG5zHYwgkh9OIlUZ950so",
  authDomain: "planit-c07f0.firebaseapp.com",
  projectId: "planit-c07f0",
  storageBucket: "planit-c07f0.appspot.com",
  messagingSenderId: "402694657782",
  appId: "1:402694657782:web:f371f24ecc4ba430047ed7",
  measurementId: "G-0KZXLYP5GR"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()
const analytics = getAnalytics(app);

export {app,storage,db}