import React, {Component} from 'react';
import { Text, View } from 'react-native';
import EventItem from '../../components/lists/EventItem'
import { useNavigation } from '@react-navigation/native'


class EventCardScreen extends Component{

  
  render(){
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
    const {navigation}=this.props
      return  <View style={{flex: 1, alignContent:'center', alignItems: 'stretch', backgroundColor: 'white', flex:6}}>              
                {  
                  events.map(item =>  <EventItem  navigation={ navigation } event={ item }/>)
                }
              </View>   
  }
};
export default EventCardScreen;