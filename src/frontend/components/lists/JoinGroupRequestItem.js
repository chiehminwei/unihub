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

  export default function JoinGroupRequestItem({firebase}) {
    const {
      userName,
      numGroups,
      numFriends,
      userID,
      major,
      uri,
      
      classyear,
    } = user

    const {
      hostName,
      hostID,
      groupName,
      numMembers,
      availability,
      // groupID,
      description,
      isPrivate
    } = group
    return(
      <View style={{marginVertical:10}}>
        <View style={{flexDirection:'row',}}>
          <TouchableOpacity style={{flex:1 , }}>
            <Image          
              source={{ uri }}
              style={{width: 50, height: 50, borderRadius:25 }} 
            
            />
          </TouchableOpacity>
          <View style={{flex: 4, }}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity>
                <Text style={
                  {
                    fontFamily:'Avenir-Light',
                    fontWeight:'bold',
                    fontSize:14
                  }
                }>{userName}</Text>  
              </TouchableOpacity>
              <Text style={
                {
                  fontFamily:'Avenir-Light',
                  
                  fontSize:14
                }
              }> wants to join </Text>
              <TouchableOpacity>
                <Text style={
                  {
                    fontFamily:'Avenir-Light',
                    fontWeight:'bold',
                    fontSize:14
                  }
                }>{groupName}</Text>  
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
              <Button >accept</Button>
              <Button >reject</Button>
            </View>
          </View>
        </View>
        <Divider style={{marginTop:10}}/>
      </View>
    )
  }


