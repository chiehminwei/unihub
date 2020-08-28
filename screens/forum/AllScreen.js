import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { ThreadContent } from '../../components/Lists/ThreadContent';
// import MapView from 'react-native-maps';



class AllScreen extends Component{

  render(){
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ThreadContent/>
             </View>       
  }
};
export default AllScreen;
// export default SwitchContent;