import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
// import Comment from "./data/comment";
// import Group from "./data/group";
// import Notification from "./data/notification";
// import Post from "./data/post";
import User from "./data/user";
import Event from "./data/event";
import Calendar from "./data/calendar";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  },
  signInAnonymously: () => {
    return auth.signInAnonymously();
  },
  registerWithEmail: (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  },
  logout: () => {
    return auth.signOut();
  },
  checkUserAuth: user => {
    return auth.onAuthStateChanged(user);
  },
  passwordReset: email => {
    return auth.sendPasswordResetEmail(email);
  },
  // firestore
  ...Calendar,
  ...Event,
  ...User,
};

export default Firebase;
