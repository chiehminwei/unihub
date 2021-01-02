import React, {Component, useEffect, useState, useContext} from 'react';
import { Text, View } from 'react-native';
import GroupList from '~/components/lists/GroupList';
import { AuthUserInfoContext } from '~/navigation/AuthUserProvider';
import { withFirebaseHOC } from "~/../firebase";


const GroupScreen = ({ firebase, navigation }) => {
    const [ groups, setGroups ] = useState([]);
    const { userInfo } = useContext(AuthUserInfoContext);

    useEffect(() => {
      const unsubscribe = firebase.getUserGroups(userInfo.uid, setGroups);
      return () => {
        unsubscribe();
      }
    }, []);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'white'}}>
        <GroupList groups={groups} navigation={navigation}/>
      </View>
    )       
};

export default withFirebaseHOC(GroupScreen);