import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventCardScreen from '../screens/profile/EventCardScreen';
import ThreadCardScreen from '../screens/profile/ThreadCardScreen';


const ProfileTab = createMaterialTopTabNavigator();

export function ProfileTabNavigator() {

  
    return (
      <ProfileTab.Navigator 
        tabBarOptions={{
            style:{
                backgroundColor:'#F3F3F3'
            },
            indicatorStyle: {
                borderBottomColor: '#00889A',
                borderBottomWidth: 1
            },
        }}
        >
        <ProfileTab.Screen name="Events" component={EventCardScreen} />
        <ProfileTab.Screen name="Forums" component={ThreadCardScreen} />
      </ProfileTab.Navigator>
    );
  }

  