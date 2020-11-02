import * as firebase from "firebase";

// User_Public
const User_Public = {

  addUserPublic: data => {
    let collection = firebase.firestore().collection('User_Public');
    let myID = firebase.auth().currentUser;
    return collection.doc(myID).add(data);
  },
  
  deleteUserPublic: userID => {
    let collection = firebase.firestore().collection('User_Public');
    let myID = firebase.auth().currentUser;
    if (myID != userID) {
      return Promise.reject();
    }
    return collection.doc(myID).delete();
  },

  getUserPublic: userID => {
    return firebase.firestore().collection('User_Public').doc(userID).get();
  },

  setNotation: (userID, newNote) => {
    let collection = firebase.firestore().collection('User_Public');
    let userdoc = collection.doc(hostID);
    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(userdoc).then(doc => {
        trans.set(userdoc, {
          'Notation': newNote
        });
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },


  

  // This Part won't allow user to manipulate.
  updateUserPublic: (userID, newData) => {
    let collection = firebase.firestore().collection('User_Public');
    let userdoc = collection.doc(hostID);
    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(userdoc).then(doc => {
        trans.update(userdoc, newData);
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },
  










}

export default User_Public;


