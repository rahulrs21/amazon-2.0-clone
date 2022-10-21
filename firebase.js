// v9 compat packages are API compatible with v8 code
// import firebase from 'firebase/compat/app';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBKzws9S4VlCazDucXMpm0Ba2oNNDz4IhQ",
    authDomain: "yt-8aab7.firebaseapp.com",
    projectId: "yt-8aab7",
    storageBucket: "yt-8aab7.appspot.com",
    messagingSenderId: "798341604891",
    appId: "1:798341604891:web:f2299e1541ab5b5020fabe"
};



const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export default db;




// "firebase": "^9.12.1",
// "firebase": "^8.2.1"