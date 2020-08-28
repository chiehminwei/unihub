import React, {Component} from 'react';
import { Text, View } from 'react-native';
import ThreadList from '../../components/lists/ThreadList';


class AllScreen extends Component{

  render(){
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThreadList/>
             </View>       
  }
};
export default AllScreen;