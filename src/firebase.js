import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDIDqaU85y5qajWvo3I41RYghA8aObM1XQ",
    authDomain: "kotha-hoby.firebaseapp.com",
    projectId: "kotha-hoby",
    storageBucket: "kotha-hoby.appspot.com",
    messagingSenderId: "705386263551",
    appId: "1:705386263551:web:e9c46c9b9904f9153c2dca",
  })
  .auth();
