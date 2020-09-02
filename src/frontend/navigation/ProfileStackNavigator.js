import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '~/screens/profile/ProfileScreen';
import { ProfileDetailScreen } from '~/screens/profile/ProfileDetailScreen';
import { FriendListScreen } from '~/screens/profile/FriendListScreen';
import { SettingsScreen } from '~/screens/profile/SettingsScreen';
import GroupDetailScreen  from '~/screens/forum/GroupDetailScreen';
import EventDetailScreen from '~/screens/home/EventDetailScreen';
import ThreadDetailScreen from '~/screens/forum/ThreadDetailScreen';
import ThreadCardScreen from '~/screens/profile/ThreadCardScreen';
import GroupScreen from '~/screens/forum/GroupScreen';

const ProfileStack = createStackNavigator();


export function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName ='Profile' >
      <ProfileStack.Screen options={{headerShown: false}}name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Your Profile" component={ProfileDetailScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Friend" component={FriendListScreen} />
      <ProfileStack.Screen  name='Groups' component={GroupDetailScreen} />
      <ProfileStack.Screen  name='GroupDetail' component={GroupDetailScreen} />
      <ProfileStack.Screen  name='ThreadDetail' component={ThreadDetailScreen} />
      <ProfileStack.Screen  name='EventDetail' component={EventDetailScreen} />
      <ProfileStack.Screen  options={{title:'My Posts'}}name='ThreadCard' component={ThreadCardScreen} />
      <ProfileStack.Screen  options={{title:'My Groups'}}name='GroupScreen' component={GroupScreen} />
    </ProfileStack.Navigator>
  );
}