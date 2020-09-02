import React, {Component} from 'react';
import { Text, View, SectionList} from 'react-native';

import DiscoverList from '../../components/lists/DiscoverList';





class DiscoverScreen extends Component{
  
  render(){
   const {navigation}=this.props
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <DiscoverList navigation={navigation}/>
        </View>
      )       
  }
};
export default DiscoverScreen;