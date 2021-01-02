import * as firebase from "firebase";

// Users
const Users = {
  addUser: data => {
    console.log('firebase:addUser')
    const collection = firebase.firestore().collection('users');
    const userID = firebase.auth().currentUser;
    return collection.doc(myID).add(userID);
  },
  deleteUser: userID => {
    console.log('firebase:deleteUser')
    const collection = firebase.firestore().collection('users');
    const myID = firebase.auth().currentUser;
    if (myID != userID) {
      return Promise.reject();
    }
    return collection.doc(myID).delete();
  },
  setUser: (data, userID) => {
    console.log('firebase:setUser')
    const collection = firebase.firestore().collection('users');
    const myID = firebase.auth().currentUser;
    if (myID != userID) {
      return Promise.reject();
    }
    return collection.doc(myID).set(data);
  },
  getUserPrivate: (userID, observer) => {
    console.log('firebase:getUserPrivate')
    if (userID == firebase.auth().currentUser) {
      return firebase.firestore().doc(`users/${userID}`).onSnapshot(observer);
    } else {
      Alert.alert('Not authorized.'); // Whatever expos use for casting errors.
      return Promise.reject();
    }
  },
  getUserPublic: (userID, observer) => {
    console.log('firebase:getUserPublic')
    if (userID == firebase.auth().currentUser) {
      return firebase.firestore().doc(`users/${userID}`).onSnapshot(observer);
    }
  },
  getCurrentUserInfo: () => {
    console.log('firebase:getCurrentUserInfo')
    const user = firebase.auth().currentUser;
    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    }
    Object.keys(userInfo).forEach((key) => (userInfo[key] == null) && delete userInfo[key]);
    return userInfo;
  },
  // TODO: event posts
  // TODO: forum posts
  // TODO: groups (membership)
  addFriend: () => {
    return -1
  },
  removeFriend: () => {
    return -1
  },
  blockUser: () => {
    return -1
  },
  unblockUser: () => {
    return -1
  },
  reportUser: () => {
    return -1
  }

  //This part cannot be edited by users
}

export default Users;


