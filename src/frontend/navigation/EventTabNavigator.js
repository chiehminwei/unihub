import React from 'react';
import { View, Animated, TouchableOpacity, StyleSheet, Text } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  CommentScreen  from '~/screens/home/CommentScreen';
import  ParticipantScreen  from '~/screens/home/ParticipantScreen';




const EventTab = createMaterialTopTabNavigator();

export default function EventTabNavigator({user}) {
  console.log(user)
  
    return (
      <EventTab.Navigator
          tabBarOptions={{
            style:{
                    backgroundColor:'white'
              },
            indicatorStyle: {
              borderBottomColor: '#00889A',
              borderBottomWidth: 3
              },
            }}
          // tabBar={ props => <EventTabBar {...props}/>}
          >
          
        <EventTab.Screen name="Comments" component={CommentScreen} />
        <EventTab.Screen name="Participants" children={()=><ParticipantScreen user={user}/>} />
      </EventTab.Navigator>
    );
  }

