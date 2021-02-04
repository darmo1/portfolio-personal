import firebase from "firebase/app"
import 'firebase/firestore'
require('dotenv').config()

var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain:  process.env.authDomain ,
    projectId:  process.env.projectId,
    storageBucket: process.env.storageBucket ,
    messagingSenderId: process.env.messagingSenderId ,
    appId: process.env. appId,
  };

    // Initialize Firebase
    const fb = firebase.initializeApp(firebaseConfig);
    export const db = fb.firestore(); //vamos a utilizar el firestrore