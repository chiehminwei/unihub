import React, {Component, useEffect, useState, useContext} from 'react';
import { Text, View } from 'react-native';
import GroupList from '~/components/lists/GroupList';
import { AuthUserInfoContext } from '~/navigation/AuthUserProvider';
import { UserGroupsContext } from '~/navigation/UserGroupsProvider';
import { withFirebaseHOC } from "~/../firebase";


const GroupScreen = ({ firebase, navigation }) => {
    const { userInfo } = useContext(AuthUserInfoContext);
    const { userGroups } = useContext(UserGroupsContext);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'white'}}>
        <GroupList groups={userGroups} navigation={navigation}/>
      </View>
    )       
};

export default withFirebaseHOC(GroupScreen);