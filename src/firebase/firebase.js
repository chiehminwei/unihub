import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
// import Comment from "./data/comment";
import Group from "./data/group";
// import Notification from "./data/notification";
// import Post from "./data/post";
import User from "./data/user";
import Event from "./data/event";
import Calendar from "./data/calendar";
import Thread from "./data/thread";


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
const firestore = firebase.firestore();

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
  updateUserProfile: profile => {
    return auth.currentUser.updateProfile(profile);
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
  getCurrentTime: (setCurrentTime) => {
    console.log('firebase:getCurrentTime')
    const currentTimeStamp = firebase.firestore.FieldValue.serverTimestamp();
    const timeOffsetRef = firestore.doc('info/serverTimeOffset');
    timeOffsetRef.set({ timestamp: currentTimeStamp });

    const unsubscribe = timeOffsetRef.onSnapshot(snapshot => {
      console.log('firebase:getCurrentTime:snapshot')
      const { timestamp } = snapshot.data();
      if (timestamp) {
        setCurrentTime(timestamp);
      }      
    });
    return unsubscribe;
  },
  // firestore
  ...Calendar,
  ...Event,
  ...User,
  ...Group,
  ...Thread,
};

export default Firebase;
