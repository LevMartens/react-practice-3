import * as firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD3zfmblZmRj8ZaLMlc5d-WgsDY_F6aMEE",
  authDomain: "straightline-fd5e2.firebaseapp.com",
  projectId: "straightline-fd5e2",
  storageBucket: "straightline-fd5e2.appspot.com",
  messagingSenderId: "584133178686",
  appId: "1:584133178686:web:5bec63c179273b9344a86f",
  measurementId: "G-XPMS4QFHL1",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
