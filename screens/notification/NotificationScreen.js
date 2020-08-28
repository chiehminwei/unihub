import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '../../stylesheets/screenStyles'

// Import Header for HomeScreen
import { NotificationScreenHeader } from '../../components/headers/NotificationScreenHeader'

export function NotificationScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea} edges={['right','top','left']}>
      <StatusBar barStyle="dark-content" />
      <NotificationScreenHeader/>
      <View style={{backgroundColor :'white', alignSelf: 'stretch', flex:10}}>
        <Text>Body of the Screen</Text>
      </View>
    </SafeAreaView>
  );
}