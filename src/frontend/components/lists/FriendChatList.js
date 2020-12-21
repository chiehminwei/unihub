import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList}  from 'react-native';
import FriendChatItem from './FriendChatItem';
// import { styles } from '../stylesheets/styles';

const users = [
  {
    userName: 'Yufan Wang',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu123',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },
  {
    userName: 'Jimmy Wei',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu234',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },

  {
    userName: 'Dawn Yao',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu345',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },

  {
    userName: 'Eric Li',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu456',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },



];


export default function FriendChatList({ navigation, scrollEnabled }) {

  return(
    <FlatList
      scrollEnabled={ scrollEnabled }
      keyExtractor={ (item) => item.userID }
      data = { users }
      renderItem={({ item }) => <FriendChatItem navigation={ navigation } user={ item } onPress={()=>navigation.navigate('ChatExample')}/>}
    />
  )
}

