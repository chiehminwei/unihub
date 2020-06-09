
import * as firebase from "firebase";

// Item
const Item = {
  addItem: data => {
    let collection = firebase.firestore().collection('items');
    return collection.add(data);
  },
  addComment: (comment, itemID) => {
    let collection = firebase.firestore().collection(`items/${itemID}/comments/`)
    return collection.add(comment)
  },
  updateComment: (comment, itemID, commentID) => {
    let docRef = firebase.firestore().document(`items/${itemID}/comments/${commentID}`)
    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(docRef).then(doc => {
        trans.update(docRef, comment);
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },
  removeComment: (comment, itemID, commentID) => {
    let docRef = firebase.firestore().document(`items/${itemID}/comments/${commentID}`)
    docRef.delete().then(function() {
        console.log("Comment successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing comment: ", error);
    });    
  },

  addDetail: (detail, itemID) => {
    let collection = firebase.firestore().collection(`items/${itemID}/details/`)
    return collection.add(detail)
  },
  updateDetail: (detail, itemID, detailID) => {
    let docRef = firebase.firestore().document(`items/${itemID}/details/${detailID}`)
    let transaction = firebase.firestore().runTransaction(trans => {
      return trans.get(docRef).then(doc => {
        trans.update(docRef, detail);
      });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  },
  removeDetail: (detail, itemID, detailID) => {
    let docRef = firebase.firestore().document(`items/${itemID}/details/${detailID}`)
    docRef.delete().then(function() {
          console.log("detail successfully deleted!");
    }).catch(function(error) {
          console.error("Error removing detail: ", error);
    });    
  },
  // Do these later (depends on Firebase storage & UI)
  // addPicture: (itemID, pictureID) => {
  //   let picture = {
  //     pictureID,
  //     'order': 
  //   }
  // },
  // removePicture: (pictureID) => {
  //   let 
  // },

  // TODO: pagination
  getAllItems: renderer => {
    var query = firebase.firestore()
      .collection('Items')
      .orderBy('avgRating', 'desc')
      .limit(50);
    this.getDocumentsInQuery(query, renderer);
  },
  // TODO: querying & filtering & sorting



  // getDocumentsInQuery: (query, renderer) => {
  //   query.onSnapshot(function(snapshot) {
  //     if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".
  
  //     snapshot.docChanges().forEach(function(change) {
  //       if (change.type === 'removed') {
  //         renderer.remove(change.doc);
  //       } else {
  //         renderer.display(change.doc);
  //       }
  //     });
  //   });
    
  // },
  // getItem: id => {
  //   return firebase.firestore().collection('items').doc(id).get();
  // },
  // getFilteredItems: (filters, renderer) => {
  //   var query = firebase.firestore().collection('items');

  //   if (filters.category !== 'Any') {
  //     query = query.where('category', '==', filters.category);
  //   }

  //   if (filters.city !== 'Any') {
  //     query = query.where('city', '==', filters.city);
  //   }

  //   if (filters.price !== 'Any') {
  //     query = query.where('price', '==', filters.price.length);
  //   }

  //   if (filters.sort === 'Rating') {
  //     query = query.orderBy('avgRating', 'desc');
  //   } else if (filters.sort === 'Reviews') {
  //     query = query.orderBy('numRatings', 'desc');
  //   }

  //   this.getDocumentsInQuery(query, renderer);
  // },

  
};

export default Item;