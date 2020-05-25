import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  signOut: () => {
    return firebase.auth().signOut();
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user);
  },
  passwordReset: email => {
    return firebase.auth().sendPasswordResetEmail(email);
  },
  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection("users")
      .doc(`${userData.uid}`)
      .set(userData);
  },
  uid: () => {
    return (firebase.auth().currentUser || {}).uid;
  },
  ref: messagesRef => {
    return firebase.database().ref(messagesRef);
  },
  parse: snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  },
  on: callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)))
  },
  timestamp: () => {
    return firebase.database.ServerValue.TIMESTAMP;
  },
  
};

export default Firebase;
