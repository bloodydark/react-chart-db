import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGlYHP8cTW3cmajHgFpAielBPqI0k2lh4",
  authDomain: "just-clock-it-2b347.firebaseapp.com",
  databaseURL: "https://just-clock-it-2b347.firebaseio.com",
  projectId: "just-clock-it-2b347",
  storageBucket: "just-clock-it-2b347.appspot.com",
  messagingSenderId: "801921840852",
  appId: "1:801921840852:web:3eb4ed4c3429f7fbc96d41",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
// export const db = firebase.firestore();
