import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyCevmiqoWW-fRe1hJCbpbytfJse-umtRxM",
    authDomain: "delivery-app-5459f.firebaseapp.com",
    projectId: "delivery-app-5459f",
    storageBucket: "delivery-app-5459f.appspot.com",
    messagingSenderId: "652798215385",
    appId: "1:652798215385:web:fc393be87e8e3fddca2ac8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectStorage, projectFirestore, timestamp };