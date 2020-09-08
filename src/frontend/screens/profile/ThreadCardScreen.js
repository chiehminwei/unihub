import React, {Component} from 'react';
import { Text, View } from 'react-native';
import ThreadList from '../../components/lists/ThreadList';


class ThreadCardScreen extends Component{

  render(){
      return <View style={{ flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
                <ThreadList scrollEnabled={false}/>
             </View>       
  }
};
export default ThreadCardScreen;