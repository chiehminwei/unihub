


getUser: id => {
  return firebase.firestore().collection.('User_Public').doc(id).get();
}

searchUsers: ()

