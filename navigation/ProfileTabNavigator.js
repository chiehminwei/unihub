import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function EventCardScreen() {
  return (
    <View style={{ backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Events</Text>
    </View>
  );
}

function ForumCardScreen() {
  return (
    <View style={{ backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Forums</Text>
    </View>
  );
}

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
        <ProfileTab.Screen name="Forums" component={ForumCardScreen} />
      </ProfileTab.Navigator>
    );
  }

  