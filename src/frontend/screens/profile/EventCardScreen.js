import React, {Component} from 'react';
import { Text, View } from 'react-native';
import EventList from '../../components/lists/EventList';
import { useNavigation } from '@react-navigation/native'


class EventCardScreen extends Component{
  render(){
    const {navigation}=this.props
      return  <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch', backgroundColor: 'white', alignSelf: 'stretch', flex:6}}>              
                    <EventList  navigation={navigation}
                                scrollEnabled={true}/>
              </View>   
  }
};
export default EventCardScreen;