import React, {Component} from 'react';
import { Text, View } from 'react-native';
import EventList from '../../components/lists/EventList';
import { useNavigation } from '@react-navigation/native'


class EventCardScreen extends Component{
  render(){
    const {navigation}=this.props
      return <View style={{ flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                <EventList navigation={navigation}
                           scrollEnabled={false}/>
             </View>       
  }
};
export default EventCardScreen;