import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles';
import { styles } from '~/stylesheets/styles';
import { NaviButton } from '~/components/button/NaviButton';
import Search from '~/components/Search';
import MapContent from '~/components/MapContent';
import EventList from '~/components/lists/EventList';



export default class HomeScreen extends Component {
  constructor(){
    super()
    this.state = {
      isMap : false,
      iconName: 'navigation',
    }
  }

  changeType = () => {
    let { isMap } = this.state;
    const iconName = isMap ? 'navigation' : 'format-list-bulleted';
    isMap = !isMap;    
    this.setState({ isMap, iconName });
  }

  render() {
    const { navigation } = this.props;
    const { isMap, iconName } = this.state;
    
    return (
      <SafeAreaView style={screenStyles.safeArea} edges={['right','top','left']}>
        <StatusBar  barStyle='dark-content' />
        <View style = {{ alignSelf:'stretch', flex:1, backgroundColor:'white'}}>
        <View 
          style={{ 
              minHeight:50,
              flex: 1, 
              alignSelf: 'stretch', 
              textAlign: 'center', 
              // backgroundColor: 'white'
              }}>
          <View style={styles.homeheader}>
            <View style={{flexDirection:'row',flex:1, justifyContent:'space-between',alignItems:'center'}}>
              <Text style={styles.browse}>Browse</Text>
              <NaviButton onPress={() => navigation.navigate('Create')} 
                          iconName='plus-box' 
                          style={styles.plus} 
                          size={30}
                          iconFamily={'materialCommunity'}/>
            </View>
            <View style={{flexDirection:'row',flex:1, 
                          justifyContent:'space-between',
                          alignItems:'center'}}>
              <NaviButton onPress={() => navigation.navigate('Planner')} 
                          iconName='calendar' 
                          style={styles.calendar} 
                          size={25}
                          iconFamily={'materialCommunity'}/>
              <View style={styles.homesearch}>
                <Search/>
              </View>
              <NaviButton onPress={this.changeType} 
                          iconName={iconName} 
                          style={styles.map}
                          size={25}
                          iconFamily={'materialCommunity'}/>
              <NaviButton onPress={() => navigation.navigate('Filter')} 
                          iconName='filter' 
                          style={styles.filter} 
                          size={25}
                          iconFamily={'materialCommunity'}/>
            </View>
          </View>
        </View>

        <View style={{backgroundColor :'#bad4da', alignSelf: 'stretch', flex:6, borderTopLeftRadius: 20, borderTopRightRadius:20 }}>
            { isMap ? <MapContent navigation={navigation}/> : <EventList navigation={navigation}/> }
        </View>
          
        </View>
      </SafeAreaView>
    );
  }
}