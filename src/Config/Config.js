import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAI0FPN7dPr2Mwz-WOGRePVEG8ma_HBOoI",
  authDomain: "smit-hackathon-ksk.firebaseapp.com",
  projectId: "smit-hackathon-ksk",
  storageBucket: "smit-hackathon-ksk.appspot.com",
  messagingSenderId: "370872167106",
  appId: "1:370872167106:web:c6a09d7a0408ad9dc0695b"
};

  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db} 