import React, {Component} from 'react';
import { Text, View, FlatList } from 'react-native';
import EventItem from '../../components/lists/EventItem'
import { useNavigation } from '@react-navigation/native'


function EventCardScreen (){

  
    const events = [
      {
        eventName: 'Hi',
        groupName: 'EROooo',
        tags: [ '#Billiards', '#Hub' ],
        numMessages: 10,
        numGoing: 10,
        eventLocation: 'WTF',
        eventID: 'U345',
        eventDate: 'Friday JULY 3',
        uri: 'https://picsum.photos/700',
        description: 'Cool event no no no',
      },
      {
        eventName: 'NO GOOD',
        groupName: 'ACE',
        tags: [ '#Sports', '#Hub' ],
        numMessages: 10,
        numGoing: 10,
        eventLocation: "Tim's House",
        eventID: 'U456',
        eventDate: 'Friday JULY 3',
        uri: 'https://picsum.photos/700',
        description: 'Cool event no no no',
      },
      {
        eventName: 'Have Fun',
        groupName: 'CSSA',
        tags: [ '#Billiards', '#Hub' ],
        numMessages: 10,
        numGoing: 10,
        eventLocation: "Hub",
        eventID: 'U567',
        eventDate: 'Friday JULY 3',
        uri: 'https://picsum.photos/700',
        description: 'Cool event no no no',
      },
    ];
    const navigation=useNavigation()

      return  <View style={{ flex:1, paddingVertical: 20, justifyContent: 'center', alignItems: 'stretch' , backgroundColor: 'white' }}> 
                          
                <FlatList
                  data={events}
                  renderItem={({ item }) =>  <EventItem navigation={ navigation } event={ item }/>}
                  keyExtractor={item => item.eventID}
                />
                
              </View>   
  
};
export default EventCardScreen;