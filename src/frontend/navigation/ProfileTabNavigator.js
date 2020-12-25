import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventCardScreen from '../screens/profile/EventCardScreen';
import ThreadCardScreen from '../screens/profile/ThreadCardScreen';

const ProfileTab = createMaterialTopTabNavigator();

export function ProfileTabNavigator() {

  
    return (
      <ProfileTab.Navigator 
        // tabBar={ props => <ProfileTabBar {...props}/>}
        tabBarOptions={{
          style:{
                  backgroundColor:'white'
            },
          indicatorStyle: {
            borderBottomColor: '#00889A',
            borderBottomWidth: 3
            },
          }}
        >
        <ProfileTab.Screen options={{ headerShown: false }} name="Events" component={EventCardScreen} />
        <ProfileTab.Screen options={{ headerShown: false }} name="Forums" component={ThreadCardScreen} />
      </ProfileTab.Navigator>
    );
  }

  