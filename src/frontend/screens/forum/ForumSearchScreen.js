import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles';
import Search from '~/components/Search';

export function ForumSearchScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea} edges={['right','left']}>
      <StatusBar barStyle="dark-content" />
      <View style={{backgroundColor :'blue', alignSelf: 'stretch', flex:6}}>
        <Search/>
      </View>
    </SafeAreaView>
  );
}