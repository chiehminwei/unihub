import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Divider, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const comment = 
  {
    commentID: 'asd123',
      content:'you are so cooool !!!'
  }

const user =[
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
  {
    userName: 'Eric Li',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu456',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  }
]

  export default function ThreadCommentNotificationItem({firebase}) {
    const {
      commentID,
      content,

    } = comment

    const {
      userName,
      numGroups,
      numFriends,
      userID,
      major,
      uri,
      
      classyear,
    } = user
    return(
      <View style={{height: 60}}>
        <Text>{user.length} people reply to your comment: '{content}' </Text>
        <View style={{flex:1, justifyContent:'flex-end'}}>
        <Divider style={{marginTop:10}}/>
        </View>
      </View>
    )
  }


