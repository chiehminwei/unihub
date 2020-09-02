import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GroupItem from './GroupItem';
// import { styles } from '../stylesheets/styles';

const groups = [
  {
    hostName:'Jimmy',
    groupName: 'Group THON 2020',
    numMembers: 10,
    availability: "Public",
    groupID: 'U123',
    description: 'long_text',
    uri:'https://picsum.photos/700',
  },
  {
    hostName:'Timmy',
    groupName: 'ERO',
    numMembers: 10,
    availability: "Private",
    groupID: 'U234',
    description: 'long_text',
    uri:'https://picsum.photos/700',
  },
  {
    hostName:'Timmy',
    groupName: 'Gogogo',
    numMembers: 10,
    availability: "Private",
    groupID: 'U345',
    description: 'long_text',
    uri:'https://picsum.photos/700',
  },{
    hostName:'Timmy',
    groupName: 'CS211',
    numMembers: 10,
    availability: "Private",
    groupID: 'U456',
    description: 'long_text',
    uri:'https://picsum.photos/700',
  },
];



export default function GroupList({navigation}) {
  return(
      <FlatList
      keyExtractor={ (item) => item.groupID }
      data = { groups }
      renderItem={( {item} )=>( 
        <GroupItem group={ item } navigation={ navigation }/>
      )}/>

  )
}

