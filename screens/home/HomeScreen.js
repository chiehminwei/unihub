import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '../../stylesheets/screenStyles';
import SwitchIcon from '../../components/tools/SwitchIcon';
import {styles} from '../../stylesheets/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from '../../components/tools/Search';
import SwitchContent from '../../components/tools/SwitchContent';



export class HomeScreen extends Component {
  constructor(){
    super()
    this.state = {
      ismap : true
    }

    this.changeType = this.changeType.bind(this)
  }

  changeType (ismap) {
    this.setState({ismap: ismap}) // left this.state.ismap right updated ismap from childs
  }

  render() {
    const { navigation } = this.props;
    
    return (
      <SafeAreaView style={screenStyles.safeArea} edges={['right','top','left']}>
        <StatusBar barStyle="dark-content" />
        <View style = {{alignSelf:'stretch',flex:1}}>
        <View 
          style={{ 
              flex: 1,
              backgroundColor: '#F3F3F3', 
              alignSelf: 'stretch', 
              textAlign: 'center', 
          }}
        >
          <View style={styles.homeheader}>
            <View style={{flexDirection:'row',flex:1, justifyContent:'space-between',alignItems:'center'}}>
              
                <Text style={styles.browse}>Browse</Text>
              
                <TouchableOpacity
                  style={{marginRight:20}}
                  onPress={() => navigation.navigate('Create')}>
                      <MaterialCommunityIcons name="plus-box" size={30} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',flex:1, justifyContent:'space-between',alignItems:'center'}}>
              <TouchableOpacity
                style={{marginLeft:20}}
                onPress={() => navigation.navigate('Calendar')}>
                <MaterialCommunityIcons name="calendar" size={25} />
              </TouchableOpacity>
              <View style={{flex:1,marginLeft:20}}>
                <Search/>
              </View>
              <View style={{marginLeft:20,marginRight:20}}>
              <SwitchIcon
                ismap = {this.state.ismap}
                changeType = {this.changeType}
              />
              </View>
              <TouchableOpacity
                style={{marginRight:20}}
                onPress={() => navigation.navigate('Filter')}>
                <MaterialCommunityIcons name="filter" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>



        <View style={{backgroundColor :'white', alignSelf: 'stretch', flex:6}}>
          <SwitchContent ismap={this.state.ismap}/>
        </View>
          
        </View>
      </SafeAreaView>
    );
  }
}