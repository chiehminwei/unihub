import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles'
import { ProfileScreenHeader } from '~/components/headers/ProfileScreenHeader';
import { ProfileTabNavigator } from '~/navigation/ProfileTabNavigator';


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