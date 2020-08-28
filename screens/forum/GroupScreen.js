import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { GroupContent } from '../../components/Lists/GroupContent';
// import MapView from 'react-native-maps';



class GroupScreen extends Component{

  render(){
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <GroupContent/>
             </View>       
  }
};
export default GroupScreen;
// export default SwitchContent;