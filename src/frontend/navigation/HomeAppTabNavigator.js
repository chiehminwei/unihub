import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Screens import
import { ChatScreen } from '~/screens/chat/ChatScreen';
import { NotificationScreen } from '~/screens/notification/NotificationScreen';

// Navigators import
import { ForumStackScreen } from './ForumStackScreen';
import { HomeStackScreen } from './HomeStackScreen';
import { ProfileStackNavigator } from './ProfileStackNavigator';
import Animated from 'react-native-reanimated';



const Tab = createBottomTabNavigator();


export default function HomeAppTabNavigator(){
  return(
    <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              // Use icon namings from this list:
              // https://oblador.github.io/react-native-vector-icons/
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Forum') {
                iconName = 'forum';
              } else if (route.name === 'Notification') {
              iconName = 'heart';
              } else if (route.name === 'Profile') {
                iconName = 'account-circle';
              } else if (route.name === 'Chat') {
                iconName = 'send';
              }
              return  <MaterialCommunityIcons name={iconName} size={size} color={color} />
            },
          })}
          tabBarOptions={{
            activeTintColor: '#1c7085',//#1c7085
            inactiveTintColor: '#bad4da',
            showLabel: false,
            style: {
              backgroundColor: 'white',
              borderRadius:0
            },
          }}
        >
          <Tab.Screen name='Home' component={HomeStackScreen} />
          <Tab.Screen name='Forum' component={ForumStackScreen} />
          <Tab.Screen name='Chat' component={ChatScreen} />
          <Tab.Screen 
            name='Notification' 
            component={NotificationScreen} 
            options={{ tabBarBadge: 3 }} 
          />
          <Tab.Screen name='Profile' component={ProfileStackNavigator} />
        </Tab.Navigator>
  )
}