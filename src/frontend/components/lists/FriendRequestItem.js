import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Divider, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const group = 
  {
    hostName:'Jimmy',
    groupName: 'Group THON 2020',
    numMembers: 10,
    availability: "Public",
    groupID: 'U123',
    description: 'long_text',
    uri:'https://picsum.photos/700',
  }

const user =
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

  export default function FriendRequestItem({firebase}) {
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
      <View>
        <Image          
        	source={{ uri }}
        	style={{width: 50, height: 50 }} 
        
        />
        <Text>{userName}  sends you a friend request</Text>
        <Button >accept</Button>
        <Button >reject</Button>
      </View>
    )
  }


