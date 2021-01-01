import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ThreadList from '~/components/lists/ThreadList';
import { withFirebaseHOC } from "~/../firebase";


const AllScreen = ({ firebase }) => {
  const [ threads, setThreads ] = useState([]);
  useEffect(() => {
      return firebase.getPosts(setThreads)
    }, []);

  return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
            <ThreadList threads={threads}/>
         </View>)
};
export default withFirebaseHOC(AllScreen);