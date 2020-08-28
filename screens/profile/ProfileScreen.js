import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '../../stylesheets/screenStyles'

// Import Header for HomeScreen
import { ProfileScreenHeader } from '../../components/screen_headers/ProfileScreenHeader'
import { ProfileTabNavigator } from '../../Navigators/ProfileTabNavigator';

export function ProfileScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea} edges={['right','top','left']}>
      <StatusBar barStyle="dark-content" />
      <ProfileScreenHeader/>
      <View style={{alignSelf: 'stretch', flex:6}}>
        <ProfileTabNavigator/>
      </View>
    </SafeAreaView>
  );
}