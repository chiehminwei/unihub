import * as firebase from "firebase";

const Event = {
  createEvent: (data) => {
    let collection = firebase.firestore().collection('events');
    return collection.add(data);
  },
  modifyEvent: (data, eventID) => {
    // TODO: update participant when event is modified
    // e.g. update user calendar
    let docRef = firebase.firestore().doc(`events/${eventID}`);
    return docRef.set(data);
  },
  deleteEvent: (eventID) => {
    // TODO: updates fields that keep track of events in user & group
    // TODO: delete comment
    // TODO: update participant when event is modified
    // e.g. update user calendar
    let docRef = firebase.firestore().doc(`events/${eventID}}`)
    return docRef.delete();
  },
  reportEvent: (eventID) => {
    return -1;
  },
  // TODO: participants
  likeEvent: (eventID) => {
    return -1;
  },
  unlikeEvent: (eventID) => {
    return -1;
  },
  // TODO: turn off comments
  
  // TODO: pagination, sort by time?
  getEvents: (eventID) => {
    let query = firebase.firestore().collection("events").where("userID", "==", userID);
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

export default Event;