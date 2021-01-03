import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles';
import { styles } from '~/stylesheets/styles';
import { NaviButton } from '~/components/button/NaviButton';
import Search from '~/components/Search';
import MapContent from '~/components/MapContent';
import EventList from '~/components/lists/EventList';
import { Button } from 'react-native';
import { withFirebaseHOC } from "~/../firebase";


const HomeScreen = ({ firebase, navigation }) => {

  const [ isMap, setIsMap ] = useState(false);
  const [ iconName, setIconName ] = useState('navigation');
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    // TODO: keyevents
    const unsubscribe = firebase.getEvents(setEvents);
    return unsubscribe;
  }, []);

  const changeType = () => {
    const iconName = isMap ? 'navigation' : 'format-list-bulleted';
    setIsMap(!isMap);
    setIconName(iconName);
  }

  return (
    <SafeAreaView style={screenStyles.safeArea} edges={['right','top','left']}>
      <StatusBar  barStyle='dark-content' />
      <View style = {{ alignSelf:'stretch', flex:1, backgroundColor:'white'}}>

        {/* HEADER */}
      <View 
        style={{ 
            minHeight:50,
            height:55,
            maxHeight:60,
            alignSelf: 'stretch', 
            textAlign: 'center', 
            // backgroundColor: 'white'
            }}>
        <View style={styles.homeheader}>
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
            <NaviButton onPress={changeType} 
                        iconName={iconName} 
                        style={styles.map}
                        size={25}
                        iconFamily={'materialCommunity'}/>
            <NaviButton onPress={() => navigation.navigate('Filter')} 
                        iconName='filter' 
                        style={styles.filter} 
                        size={25}
                        iconFamily={'materialCommunity'}/>
            <NaviButton onPress={() => navigation.navigate('Create')} 
                        iconName='plus-box' 
                        style={styles.plus} 
                        size={30}
                        iconFamily={'materialCommunity'}/>
          </View>
        </View>
      </View>
      
            {/* CONTENT */}
      <View style={{backgroundColor :'white', alignSelf: 'stretch', flex:6 }}>
          { isMap ? 
              <MapContent events={events} keyEvents={events} navigation={navigation}/> 
                : 
              <EventList events={events} keyEvents={events} navigation={navigation}/> }
      </View>
        
      </View>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(HomeScreen);