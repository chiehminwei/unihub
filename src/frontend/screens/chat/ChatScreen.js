import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FriendChatList from '~/components/lists/FriendChatList';
import { NaviButton } from '~/components/button/NaviButton';
import Search from '~/components/Search';

function ChatScreenHeader(navigation) {
  return(
    <View 
        style={{ 
          maxHeight:50,
          flex: 1,
          backgroundColor: 'white', 
          alignSelf: 'stretch', 
          textAlign: 'center', 
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:16,
          alignItems:"center",
          
            }}>
            <View style={styles.search}>
              <Search onPress={() => navigation.navigate('Search')}/>
            </View>
            <NaviButton onPress={() => alert('CreateChat')} 
                        iconName='ios-create' 
                        style={styles.plus} 
                        size={30}
                        iconFamily={'Ionicons'}/>
        </View>
  )
}



export function ChatScreen({navigation}) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['right','top','left']}>
      <ChatScreenHeader navigation={navigation}/>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:'white'}}>
        <FriendChatList navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
}


const styles= StyleSheet.create({
  safeArea:{
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: '#F3F3F3',
  },
  header:{
    height:80
  },
  homeheader: {
    flex: 1,
    backgroundColor: 'white',
  },
 search:{
  flex:2,
  marginRight: 20
 }


})