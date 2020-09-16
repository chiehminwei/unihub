import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FriendChatList from '~/components/lists/FriendChatList';


export function ChatScreen({navigation}) {
  return (
    <SafeAreaView style={{
      flex: 1, 
      alignItems: 'center', 
      backgroundColor: '#F3F3F3',}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FriendChatList navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
}