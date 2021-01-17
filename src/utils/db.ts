import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyBdenoXszJWJbhOfv-2E9C8EB_Lm4w4dT4",
  authDomain: "todoapp-development-86325.firebaseapp.com",
  databaseURL: "https://todoapp-development-86325.firebaseio.com",
  projectId: "todoapp-development-86325",
  storageBucket: "todoapp-development-86325.appspot.com",
  messagingSenderId: "185058699900",
  appId: "1:185058699900:web:dfbaab84acfea6f71537f9",
});

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = async () =>
  await auth.signInWithRedirect(provider);
// signInWithPopup(provider);

export default firebase;
