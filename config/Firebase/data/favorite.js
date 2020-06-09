
import * as firebase from "firebase";

const Favorite = {
  addFavorite: data => {
    let collection = firebase.firestore().collection('favorites');
    return collection.add(data);
  },
  removeFavorite: (itemID) => {
    let docRef = firebase.firestore().document(`items/${itemID}}`)
    docRef.delete().then(function() {
        console.log("Item removed frem favorite list!");
    }).catch(function(error) {
        console.error("Error removing favorite item: ", error);
    });    
  },
  // TODO: pagination, sort by time?
  getFavorites: (userID) => {
    let query = firebase.firestore().collection("favorites").where("userID", "==", userID);
    query.get()
        .then(function(querySnapshot) {
            return querySnapshot
            // querySnapshot.forEach(function(doc) {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, " => ", doc.data());
            // });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
  }
};

export default Favorite;