import * as firebase from "firebase";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const getRequestRef = (userID, groupID) => firestore.doc(`groups/${groupID}/join_requests/${userID}`);
const getUserRequestRef = (userID, groupID) => firestore.doc(`users/${userID}/join_requests/${groupID}`);
const getMemberRef = (userID, groupID) => firestore.doc(`groups/${groupID}/members/${userID}`);
const getMemberCollectionRef = (groupID) => firestore.collection(`groups/${groupID}/members/`);
const getUserGroupRef = (userID, groupID) => firestore.doc(`users/${userID}/groups/${groupID}`);
const getGroupCollection = () => firestore.collection('groups');
const getGroupRef = (groupID) => firestore.doc(`groups/${groupID}`);

const Group = {
  createGroup: (group) => {
    // Create group, add admin as member, add group to admin's group list
    const userInfo = group.admin;
    const userID = userInfo.uid;

    const groupRef = getGroupCollection().doc();
    const groupID = groupRef.id;
    group.groupID = groupID;
    group.numMember = 1;

    const { groupName } = group;
    
    const memberRef = getMemberRef(userID, groupID);
    const userGroupRef = getUserGroupRef(userID, groupID);

    const batch = firestore.batch();
    batch.set(groupRef, group);
    batch.set(memberRef, userInfo);
    batch.set(userGroupRef, group);
    batch.commit()
         .catch(err => console.error(err));    
  },
  disbandGroup: (groupID) => {
    // Delete group, and delete group from each member's group list
    const groupRef = getGroupRef(groupID);
    const memberCollection = getMemberCollectionRef(groupID)
    memberCollection.get().then(querySnapshot => {
      const batch = firestore.batch();
      batch.delete(groupRef);
      querySnapshot.forEach(memberDoc => {
        const userID = memberDoc.data().uid;
        const userGroupRef = getUserGroupRef(userID, groupID);
        batch.delete(userGroupRef);
      })
      return batch.commit();
    }).catch(err => console.error(err));
  },
  joinGroup: (user, groupID) => {
    // Send a request to join group, and remeber "requested" in user request queue
    const requestRef = getRequestRef(user.uid, groupID); 
    const userRequestRef = getUserRequestRef(user.uid, groupID);
    
    const batch = firestore.batch();
    batch.set(requestRef, user);
    batch.set(userRequestRef, { contains: true });
    batch.commit()
         .catch(err => console.error(err));
  },
  quitGroup: (userID, groupID) => {
    // Remove user from group member list, and remove group from user's group list
    const memberRef = getMemberRef(userID, groupID);  
    const userGroupRef = getUserGroupRef(userID, groupID)
    const groupRef = getGroupRef(groupID);

    return firestore.runTransaction(async transaction => {
      const group = await transaction.get(groupRef);
      if (!group.exists) {
          throw "Group does not exist!";
      }

      const { groupName, numMember } = group.data();

      transaction.delete(memberRef);
      transaction.delete(userGroupRef);

      transaction.update(groupRef, { numMember: numMember - 1});
      transaction.update(groupRef, { numMember: numMember - 1});     
    }).catch(err => console.error(err));
  },
  acceptMember: (userID, groupID) => {
    // Remove requests (from user's request list and group's request list)
    // Add user to member list
    // Add group to user's group list
    const requestRef = getRequestRef(userID, groupID);
    const memberRef = getMemberRef(userID, groupID);
    const userGroupRef = getUserGroupRef(userID, groupID)
    const userRequestRef = getUserRequestRef(userID, groupID);
    const groupRef = getGroupRef(groupID);

    return firestore.runTransaction(async transaction => {
      const request = await transaction.get(requestRef);
      const group = await transaction.get(groupRef);
      if (!request.exists || !group.exists) {
          throw "Join request or group does not exist!";
      }

      const userInfo = request.data();
      const groupData = group.data();
      const { numMember } = groupData;
      groupData.numMember += 1;

      transaction.update(groupRef, { numMember: numMember + 1});
      transaction.set(memberRef, userInfo);
      transaction.set(userGroupRef, groupData);
      transaction.delete(requestRef);
      transaction.delete(userRequestRef);
      
    }).catch(err => console.error(err));
  },
  rejectMember: (userID, groupID) => {
    // Remove requests (from user's request list and group's request list)
    const requestRef = getRequestRef(userID, groupID);
    const userRequestRef = getUserRequestRef(userID, groupID);

    const batch = firestore.batch();
    batch.delete(requestRef);
    batch.delete(userRequestRef)
    batch.commit()
         .catch(err => console.error(err));
  },
  getUserGroups: (userID, setGroups) => {
    const groupCollection = firestore.collection(`users/${userID}/groups`);
    const unsubscribe = groupCollection.onSnapshot(snapshot => {
      if (snapshot.size) {
        const groups = [];    
        snapshot.forEach(doc => {          
          groups.push(doc.data());
        })
        setGroups(groups);
      }
    })
    return unsubscribe;
  },
  getMembers: (groupID, setMembers) => {
    const memberCollection = getMemberCollectionRef(`${groupID}`).limit(11);
    const unsubscribe = memberCollection.onSnapshot(snapshot => {
      if (snapshot.size) {
        const members = [];    
        snapshot.forEach(doc => {          
          members.push(doc.data());
        })
        setMembers(members);
      }
    })
    return unsubscribe;
  },
  getGroup: (groupID, setGroup) => {
    const groupRef = getGroupRef(`${groupID}`);
    const unsubscribe = groupRef.onSnapshot(snapshot => {
      if (snapshot.exists) {
        const group = snapshot.data();
        setGroup(group);
      }
    })
    return unsubscribe;
  },
  getGroups: (setGroups) => {
    const groupCollection = getGroupCollection().limit(10);
    const unsubscribe = groupCollection.onSnapshot(snapshot => {
      if (snapshot.size) {
        const groups = []
        snapshot.forEach(doc => {          
          groups.push(doc.data());
        })
        setGroups(groups);
      }
    })
    return unsubscribe;
  },
  userIsInGroup: (userID, groupID, setIsInGroup) => {
    const userGroupRef = getUserGroupRef(userID, groupID);
    const unsubscribe = userGroupRef.onSnapshot(snapshot => {
      if (snapshot.exists) {
        setIsInGroup(true);
      }
      else {
        setIsInGroup(false);
      }
    })
    return unsubscribe;
  },
  userIsWaiting: (userID, groupID, setIsWaiting) => {
    // i.e. waiting for approval to join group
    const userRequestRef = getUserRequestRef(userID, groupID);
    const unsubscribe = userRequestRef.onSnapshot(snapshot => {
      if (snapshot.exists) {
        setIsWaiting(true);
      }
      else {
        setIsWaiting(false);
      }
    })
    return unsubscribe;
  },
  userIsAdmin: (userID, groupID, setIsAdmin) => {
    const groupRef = getGroupRef(`${groupID}`);
    const unsubscribe = groupRef.onSnapshot(snapshot => {
      if (snapshot.exists) {
        const { admin } = snapshot.data();
        if (admin.uid === userID) {
          setIsAdmin(true);
        }
        else {
          setIsAdmin(false);
        }
      }
    })
    return unsubscribe;
  },
  banUser: (userID, groupID) => {
    return -1;
  },
  unbanUser: (userID, groupID) => {
    return -1;
  },
  transferAdmin: (eventID) => {
    return -1;
  },
  reportGroup: (groupID) => {
    return -1;
  },
  muteGroup: (userID, groupID) => {
    return -1;
  },
  unmuteGroup: (userID, groupID) => {
    return -1;
  },
  blockGroup: (userID, groupID) => {
    return -1;
  },
  unblockGroup: (userID, groupID) => {
    return -1;
  }
};

export default Group;