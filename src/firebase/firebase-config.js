import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvmmsUCLEsf36KQyvPXOxyjBePzoQ-CyI",
    authDomain: "react-cursos-2fa98.firebaseapp.com",
    projectId: "react-cursos-2fa98",
    storageBucket: "react-cursos-2fa98.appspot.com",
    messagingSenderId: "326265258430",
    appId: "1:326265258430:web:4796a39725d3f353c6b9ef"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}