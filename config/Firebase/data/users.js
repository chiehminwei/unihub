import * as firebase from "firebase";

// Users
const Users = {

  addUser: data => {
    let collection = firebase.firestore().collection('Users');
    let myID = firebase.auth().currentUser;
    return collection.doc(myID).add(data);
  },

  deleteUser: userID => {
    let collection = firebase.firestore().collection('Users');
    let myID = firebase.auth().currentUser;
    if (myID != userID) {
      return Promise.reject();
    }
    return collection.doc(myID).delete();
  },
  
  
  getUserPrivate: userID => {
    if (userID == firebase.auth().currentUser) {
      return firebase.firestore().collection('Users').doc(userID).get();
    } else {
      Alert.alert('Not authorized.'); // Whatever expos use for casting errors.
      return Promise.reject();
    }
  },
  
  
  ifFollowee: userID => {
    let collection = firebase.firestore().collection('Users');
    
  },


  addFollowee: (hostID, userID) => {


    let Ucol = firebase.firestore().collection('Users');
    let userdoc = Ucol.doc(hostID);

    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(userdoc).then(doc => {
        trans.update(userdoc, {
          'followee': firebase.firestore.FieldValue.arrayUnion(userID)
        });
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },


  removeFollowee: (hostID, userID) => {
    
    let Ucol = firebase.firestore().collection('Users');
    let userdoc = Ucol.doc(hostID);

    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(userdoc).then(doc => {
        trans.update(userdoc, {
          'followee': firebase.firestore.FieldValue.arrayRemove(userID)
        });
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },

  setNickname: (hostID, newName) => {
    let Ucol = firebase.firestore().collection('Users');
    let userdoc = Ucol.doc(hostID);
    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(userdoc).then(doc => {
        trans.set(userdoc, {
          'Nickname': newName
        });
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },

  setPhoto: (hostID, newPhotoURL) => {
    let Ucol = firebase.firestore().collection('Users');
    let userdoc = Ucol.doc(hostID);
    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(userdoc).then(doc => {
        trans.set(userdoc, {
          'Photo': newPhotoURL
        });
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },


  updateNickname: (hostID, newName) => {
    let Ucol = firebase.firestore().collection('Users');
    let userdoc = Ucol.doc(hostID);
    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(userdoc).then(doc => {
        trans.update(userdoc, {
          'Nickname': newName
        });
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },

  updatePhoto: (hostID, newPhotoURL) => {
    let Ucol = firebase.firestore().collection('Users');
    let userdoc = Ucol.doc(hostID);
    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(userdoc).then(doc => {
        trans.update(userdoc, {
          'Photo': newPhotoURL
        });
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },
  
  






  //This part cannot be edited by users





}

export default Users;


