import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '../../stylesheets/screenStyles';
import { styles } from '../../stylesheets/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from '../../components/Search';
import MapView from '../../components/MapView';
import EventList from '../../components/lists/EventList';


export class HomeScreen extends Component {
  constructor(){
    super()
    this.state = {
      isMap : false,
      iconName: 'navigation',
    }
  }

  changeType = () => {
    let { isMap } = this.state;
    isMap = !isMap;
    const iconName = isMap ? 'navigation' : 'format-list-bulleted';
    this.setState({ isMap, iconName });
  }

  render() {
    const { navigation } = this.props;
    const { isMap, iconName } = this.state;
    
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
              <View style={{marginLeft:20, marginRight:20}}>
              <TouchableOpacity onPress={ this.changeType }>
                <MaterialCommunityIcons name={ iconName } size={25} />
              </TouchableOpacity>
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
          <View style={{ flex: 1 }}>
            { isMap ? <MapView/> : <EventList/> }
          </View>
        </View>
          
        </View>
      </SafeAreaView>
    );
  }
}