
import * as firebase from "firebase";

// function(querySnapshot) {
//   let events = [];
//   querySnapshot.forEach(function(doc) {
//     events.push(doc.data());
//   });
//   return events;
// }

const datesAreOnSameMonth = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth();

const Calendar = {
  addEvent: (data) => {
    const userID = firebase.auth().currentUser;
    const collection = firebase.firestore().doc(`users/${userID}/calendar`);
    return collection.add(data);
  },
  modifyEvent: (data, eventID) => {
    const userID = firebase.auth().currentUser;
    const docRef = firebase.firestore().doc(`users/${userID}/calendar/${eventID}`);
    return docRef.set(data);
  },
  deleteEvent: (eventID) => {
    const userID = firebase.auth().currentUser;
    const docRef = firebase.firestore().doc(`users/${userID}/calendar/${eventID}`);
    return docRef.delete();
  },
  getEvents: (startDate, endDate, observer) => {
    const userID = firebase.auth().currentUser;
    return firebase.firestore().collection(`users/${userID}/calendar/`)
      .where("date", ">=", startDate)
      .where("date", "<=", endDate)
      .onSnapshot(observer);
  }
};

export default Calendar;