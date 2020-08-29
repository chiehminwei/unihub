import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProfileScreen } from '~/screens/profile/ProfileScreen';
import { ProfileDetailScreen } from '~/screens/profile/ProfileDetailScreen';
import { FriendListScreen } from '~/screens/profile/FriendListScreen';
import { SettingsScreen } from '~/screens/profile/SettingsScreen';
import { DiscoverFriendScreen } from '~/screens/profile/DiscoverFriendScreen';




const ProfileDrawer = createDrawerNavigator();





export function ProfileDrawerNavigator() {
  return (
    <ProfileDrawer.Navigator initialRouteName ='HomeApp'
                             drawerPosition = 'right'
                             drawerType = 'slide'
                             drawerStyle={{
                              backgroundColor: 'white',
                              width: 300 }}
                             hideStatusBar
                            >
      <ProfileDrawer.Screen options={{swipeEnabled:false, drawerLabel:'back'}}  name="HomeApp" component={ProfileScreen} />
      <ProfileDrawer.Screen name="Your Profile" component={ProfileDetailScreen} />
      <ProfileDrawer.Screen name="Discover Friends" component={DiscoverFriendScreen} />
      <ProfileDrawer.Screen name="Settings" component={SettingsScreen} />
      <ProfileDrawer.Screen name="Friend List" component={FriendListScreen} />
    </ProfileDrawer.Navigator>
  );
}