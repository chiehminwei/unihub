import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ParticipantItem from '~/components/lists/FriendChatItem';




const scrollEnabled = false
export default function ParticipantsScreen({user}) {
  const users= user
  console.log(user)
  return (
    <View style={{backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList 
        scrollEnabled={ scrollEnabled }
        keyExtractor={ (item) => item.userID }
        data = { users }
        renderItem={({ item }) => <ParticipantItem user={ item } onPress={()=>alert('navigate to profile')}/>}
      />
    </View>
  );
}