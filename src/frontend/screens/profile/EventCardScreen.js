import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import EventItem from '../../components/lists/EventItem'
import { useNavigation } from '@react-navigation/native'
import { withFirebaseHOC } from "~/../firebase";
import { AuthUserInfoContext } from '~/navigation/AuthUserProvider';


function EventCardScreen ({ firebase }){
  const navigation = useNavigation();
  const [ events, setEvents ] = useState([]);
  const { userInfo } = useContext(AuthUserInfoContext);

  useEffect(() => {
    const unsubscribe = firebase.getUserEvents(userInfo.uid, setEvents);
    return unsubscribe;
  }, []);

  return  (
    <View style={{ flex:1, paddingVertical: 20, justifyContent: 'center', alignItems: 'stretch' , backgroundColor: 'white' }}>           
      <FlatList
        data={events}
        renderItem={({ item }) =>  <EventItem navigation={ navigation } event={ item }/>}
        keyExtractor={item => item.eventID}
      />              
    </View>
  )
  
};
export default withFirebaseHOC(EventCardScreen);