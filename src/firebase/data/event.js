import * as firebase from "firebase";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const getUserEventRef = (userID, eventID) => firestore.doc(`users/${userID}/events/${eventID}`);
const getGroupEventRef = (groupID, eventID) => firestore.doc(`groups/${groupID}/events/${eventID}`);
const getReportRef = (eventID) => firestore.doc(`reported/events/${eventID}`)
const getEventCollection = () => firestore.collection('events');
const getEventRef = (eventID) => firestore.doc(`events/${eventID}`);


const Event = {
  createEvent: (userID, groupID, event) => {
    // Create event, add post to author's event list
    const eventRef = getEventCollection().doc();
    const eventID = eventRef.id;

    const userEventRef = getUserEventRef(userID, eventID);
    const groupEventRef = getGroupEventRef(groupID, eventID);

    const batch = firestore.batch();
    batch.set(eventRef, event)
    batch.set(userEventRef, event);
    batch.set(groupEventRef, event);
    batch.commit()
         .catch(err => console.error(err));
  },
  modifyEvent: (userID, groupID, eventID, event) => {
    // TODO: update participant when event is modified e.g. update user calendar
    // Modify post (public, author's, group's)    
    const eventRef = getEventRef(eventID);
    const userEventRef = getUserEventRef(userID, eventID);
    const groupEventRef = getGroupEventRef(groupID, eventID);

    const batch = firestore.batch();
    batch.set(eventRef, event);
    batch.set(userEventRef, event);
    batch.set(groupEventRef, event);
    batch.commit()
         .catch(err => console.error(err));
  },
  deleteEvent: (eventID) => {
    // TODO: comments & calendar
    const eventRef = getEventRef(eventID);
    const userEventRef = getUserEventRef(userID, eventID);
    const groupEventRef = getGroupEventRef(groupID, eventID);

    const batch = firestore.batch();
    batch.delete(eventRef);
    batch.delete(userEventRef);
    batch.delete(groupEventRef, event);
    batch.commit()
         .catch(err => console.error(err));
  },
  reportEvent: (eventID, event) => {
    const reportRef = getReportRef(eventID);
    return reportRef.set(event);
  },
  joinEvent: (eventID) => {
    return -1;
  },
  quitEvent: (eventID) => {
    return -1;
  },
  // TODO: comments
  
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