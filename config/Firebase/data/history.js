
import * as firebase from "firebase";

const History = {
  setHistoryPrivacy: (itemID, privacy) => {
    let docRef = firebase.firestore().document(`history/${itemID}`);
    let transaction = firebase.firestore().runTransaction(trans => {
        return trans.get(docRef).then(doc => {
          trans.update(docRef, {
            'privacy': privacy
          });
        });
      }).then(result => {
        console.log('Transaction success', result);
      }).catch(err => {
        console.log('Transaction failure:', err);
      });
  },
  setHistoryPublic: (itemID) => {
    this.setHistoryPrivacy(itemID, "public");
  },
  setHistoryPublic: (itemID) => {
    this.setHistoryPrivacy(itemID, "private");
  },
  // TODO: pagination, sort by time?, query by privacy?
  getHistory: (userID) => {
    let query = firebase.firestore().collection("history").where("userID", "==", userID);
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

export default History;