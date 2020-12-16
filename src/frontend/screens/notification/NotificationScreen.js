import React from 'react';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles'

// Import Header for HomeScreen
import { NotificationScreenHeader } from '../../components/headers/NotificationScreenHeader'
import FriendRequestItem from '../../components/lists/FriendRequestItem';
import JoinGroupRequestItem  from '../../components/lists/JoinGroupRequestItem';
import ThreadCommentNotificationItem from '../../components/lists/ThreadCommentNotificationItem';

export function NotificationScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea} edges={['right','top','left']}>
      <StatusBar barStyle="dark-content" />
      <NotificationScreenHeader/>
      <ScrollView style={{backgroundColor :'white', alignSelf: 'stretch', flex:10, paddingHorizontal:16}}>
        <Text style={{
          fontFamily:'Avenir-Light',
          fontWeight:'bold',
          fontSize:24 }}>
              Today
        </Text>
          <JoinGroupRequestItem />
          <FriendRequestItem />
          <ThreadCommentNotificationItem />
          <Text style={{
          fontFamily:'Avenir-Light',
          fontWeight:'bold',
          fontSize:24 }}>
              This Week
        </Text>
        <Text style={{
          fontFamily:'Avenir-Light',
          fontWeight:'bold',
          fontSize:24 }}>
              This Month
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}