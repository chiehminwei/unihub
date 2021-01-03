import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Category from '../../components/Category.js';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { cond } from 'react-native-reanimated';
import Time from '../../components/Time'



export default function FilterScreen() {
  const navigation = useNavigation()
  const screenWidth = Math.round(Dimensions.get('window').width)
  const categories = ['Club', 'Academic', 'Work', 'Personal']
  const times = ['Today','This Week','This Month','This Year']
  const locations = ['In Person','Online']
  const interests = ['Dance','Music','Entertainment','Foods','Career','Arts','Media','Sports']
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{alignItems:'center', alignContent:'center'}}>
          <TouchableOpacity style={{flex:1, alignItems:'flex-end', paddingRight: 20,paddingTop: 5}} onPress={() => reset()}>
            <MaterialCommunityIcons 
                name={'refresh'}  
                size={30}  
                color={'black'}/>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, setSelected]);


  const [selected, setSelected] = useState([]);
  const [currentTime, setCurrentTime] = useState('')

  const toggle = category => setSelected(selected => (
      selected.includes(category) ? selected.filter(x => x !== category) : [...selected, category]
  ));
  const reset = () => {setSelected(selected => (selected.filter(x => x === 'none'))); setCurrentTime('');}

  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingvertical: 40 }}>

    // </View>
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={{alignItems:'stretch'}}>
          <View style={{ paddingVertical:10 }}>
            <Text style={styles.categoryTitle}>CATEGORY</Text>
            <View style={{flexDirection:'row', flexWrap:'wrap', alignContent:'center',alignItems:'center', padding: screenWidth*0.05}}>
              {
                categories.map(category => (
                  <Category
                    key = {category}
                    category = {category}
                    toggle = {toggle}
                    isSelected = {selected.includes(category)}
                  />
                ))
              }
            </View>
            <Text style={styles.categoryTitle}>TIME</Text>
            <View style={{flexDirection:'row', flexWrap:'wrap', alignContent:'center',alignItems:'center', padding: screenWidth*0.05}}>
              {
                times.map(time => (
                  <Time
                    key = {time}
                    category = {time}
                    toggle = {toggle}
                    isSelected = {selected.includes(time)}
                    currentTime = {currentTime}
                    setCurrentTime = {setCurrentTime}
                  />
                ))
              }
            </View>
            <Text style={styles.categoryTitle}>LOCATION</Text>
            <View style={{flexDirection:'row', flexWrap:'wrap', alignContent:'center',alignItems:'center', padding: screenWidth*0.05}}>
              {
                locations.map(location => (
                  <Category
                    key = {location}
                    category = {location}
                    toggle = {toggle}
                    isSelected = {selected.includes(location)}
                  />
                ))
              }
            </View>
            <Text style={styles.categoryTitle}>INTERESTS</Text>
            <View style={{flexDirection:'row', flexWrap:'wrap', alignContent:'center',alignItems:'center', padding: screenWidth*0.05}}>
              {
                interests.map(interest => (
                  <Category
                    key = {interest}
                    category = {interest}
                    toggle = {toggle}
                    isSelected = {selected.includes(interest)}
                  />
                ))
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    scrollView:{
    },
    categoryTitle:{
      marginLeft: 16,
      fontFamily:'Avenir-Light',
      fontSize:18,
      fontWeight:'bold'
    },
    text:{

    }



})


