// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBv7rXCVfLVTEcaViDQtn-rxUz38_LvgSA",
    authDomain: "goglobal-fc18d.firebaseapp.com",
    projectId: "goglobal-fc18d",
    storageBucket: "goglobal-fc18d.appspot.com",
    messagingSenderId: "974872476644",
    appId: "1:974872476644:web:bf59f101c2e4f5dff125f1",
    measurementId: "G-NYD43Q0LPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };