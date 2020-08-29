import React, {Component} from 'react';
import { Text, View } from 'react-native';
import GroupList from '~/components/lists/GroupList';


class GroupScreen extends Component{
  render(){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <GroupList/>
        </View>
      )       
  }
};
export default GroupScreen;