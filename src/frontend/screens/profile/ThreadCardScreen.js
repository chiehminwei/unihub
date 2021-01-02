import React, { useEffect, useState, useContext } from 'react';
import { Text, View } from 'react-native';
import ThreadList from '~/components/lists/ThreadList';
import { AuthUserInfoContext } from '~/navigation/AuthUserProvider';
import { withFirebaseHOC } from "~/../firebase";


const ThreadCardScreen = ({ firebase }) => {
  const [ threads, setThreads ] = useState([]);
  const { userInfo } = useContext(AuthUserInfoContext);

  useEffect(() => {
      return firebase.getUserPosts(userInfo.uid, setThreads)
    }, []);

  return (<View style={{ flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
            <ThreadList threads={threads}/>
          </View>)
};
export default withFirebaseHOC(ThreadCardScreen);