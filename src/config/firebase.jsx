import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGNDFSAQZi-a9bLYVDVKrcnAgnU9-a9aM",
  authDomain: "reto-react-a0933.firebaseapp.com",
  databaseURL: "https://reto-react-a0933.firebaseio.com",
  projectId: "reto-react-a0933",
  storageBucket: "reto-react-a0933.appspot.com",
  messagingSenderId: "945451185946",
  appId: "1:945451185946:web:005c6dbc7f0bd76b8b1ea3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;