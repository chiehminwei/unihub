import * as firebase from "firebase";

// Item
const Item = {
  addItem: data => {
    let collection = firebase.firestore().collection('items');
    return collection.add(data);
  },
  getAllItems: renderer => {
    var query = firebase.firestore()
      .collection('items')
      .orderBy('avgRating', 'desc')
      .limit(50);
    this.getDocumentsInQuery(query, renderer);
  },
  getDocumentsInQuery: (query, renderer) => {
    query.onSnapshot(function(snapshot) {
      if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".
  
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'removed') {
          renderer.remove(change.doc);
        } else {
          renderer.display(change.doc);
        }
      });
    });
    
  },
  getItem: id => {
    return firebase.firestore().collection('items').doc(id).get();
  },
  getFilteredItems: (filters, renderer) => {
    var query = firebase.firestore().collection('items');

    if (filters.category !== 'Any') {
      query = query.where('category', '==', filters.category);
    }

    if (filters.city !== 'Any') {
      query = query.where('city', '==', filters.city);
    }

    if (filters.price !== 'Any') {
      query = query.where('price', '==', filters.price.length);
    }

    if (filters.sort === 'Rating') {
      query = query.orderBy('avgRating', 'desc');
    } else if (filters.sort === 'Reviews') {
      query = query.orderBy('numRatings', 'desc');
    }

    this.getDocumentsInQuery(query, renderer);
  },
  addRating: (userID, rating) => {
    var collection = firebase.firestore().collection('users');
    var doc = collection.doc(userID);
    var newRatingDocument = doc.collection('ratings').doc();

    return firebase.firestore().runTransaction(function(transaction) {
      return transaction.get(doc).then(function(doc) {
        var data = doc.data();

        var newAverage =
            (data.numRatings * data.avgRating + rating.rating) /
            (data.numRatings + 1);

        transaction.update(doc, {
          numRatings: data.numRatings + 1,
          avgRating: newAverage
        });
        return transaction.set(newRatingDocument, rating);
      });
    });
  }
};

export default Item;