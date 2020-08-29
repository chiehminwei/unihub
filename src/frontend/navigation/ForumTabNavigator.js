import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  AllScreen  from '~/screens/forum/AllScreen';
import  GroupScreen  from '~/screens/forum/GroupScreen';
import  DiscoverScreen  from '~/screens/forum/DiscoverScreen';


const ForumTab = createMaterialTopTabNavigator();

export function ForumTabNavigator() {

  
    return (
      <ForumTab.Navigator
        tabBarOptions={{
          style:{
                  backgroundColor:'#F3F3F3'
            },
          indicatorStyle: {
            borderBottomColor: '#00889A',
            borderBottomWidth: 1
            },
          }}>
        <ForumTab.Screen name="All" component={AllScreen} />
        <ForumTab.Screen name="Group" component={GroupScreen} />
        <ForumTab.Screen name="Discover" component={DiscoverScreen} />
      </ForumTab.Navigator>
    );
  }