import React, {Component, useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import GroupList from '~/components/lists/GroupList';
import { withFirebaseHOC } from "~/../firebase";


const GroupScreen = ({ firebase, navigation }) => {
    const [ groups, setGroups ] = useState([]);

    useEffect(async () => {
      const userID = firebase.getCurrentUserInfo().uid;
      const firebaseGroups = await firebase.getUserGroups(userID);
      console.log(firebaseGroups)
      setGroups(firebaseGroups);
    }, [firebase]);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'white'}}>
        <GroupList groups={groups} navigation={navigation}/>
      </View>
    )       
};

export default withFirebaseHOC(GroupScreen);