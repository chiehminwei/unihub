import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '../../stylesheets/screenStyles';
import { ForumTabNavigator } from '../../Navigators/ForumTabNavigator'
// Import Header for HomeScreen
import { ForumScreenHeader } from '../../components/screen_headers/ForumScreenHeader'

export function ForumScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea} edges={['right','top','left']}>
      <StatusBar barStyle="dark-content" />
      <ForumScreenHeader/>
      <View style={{ alignSelf: 'stretch', flex:8 }}>
        <ForumTabNavigator/>
      </View>
    </SafeAreaView>
  );
}