import React, {Component, useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import GroupList from '~/components/lists/GroupList';
import { withFirebaseHOC } from "~/../firebase";


const GroupScreen = ({ firebase, navigation }) => {
    const [ groups, setGroups ] = useState([]);

    useEffect(() => {
      const userID = firebase.getCurrentUserInfo().uid;
      const unsubscribe = firebase.getUserGroups(userID, setGroups);
      return () => {
        unsubscribe();
      }
    }, [firebase]);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'white'}}>
        <GroupList groups={groups} navigation={navigation}/>
      </View>
    )       
};

export default withFirebaseHOC(GroupScreen);