import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
//import screens
import HomeScreen  from '~/screens/home/HomeScreen';
import FilterScreen from '~/screens/home/FilterScreen';
import PlannerScreen from '~/screens/home/PlannerScreen';
import EventDetailScreen from '~/screens/home/EventDetailScreen';


const HomeStack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home" >
      <HomeStack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      <HomeStack.Screen  
        options={
                
          {
          title: 'Calendar',
          headerLeft: () => (
            <BackButton title={'Back'}/>
          ),
          }
        }
        name="Filter"  
        component={FilterScreen} />
      <HomeStack.Screen 
        options={
                
          {
          title: 'Calendar',
          headerLeft: () => (
            <BackButton title={'Back'}/>
          ),
          }
        }
        name="Planner" 
        component={PlannerScreen} 
        />
      <HomeStack.Screen options={{headerShown: false}} name="EventDetail" component={EventDetailScreen} />      
    </HomeStack.Navigator>
  );
}