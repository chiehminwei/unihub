import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GroupItem from './GroupItem';
// import { styles } from '../stylesheets/styles';

const groups = [
  {
    groupName: 'Group THON 2020',
    numFollowers: 10,
    availability: "Public",
    groupID: 'U123',
  },
  {
    groupName: 'Gogogo',
    numFollowers: 10,
    availability: "Private",
    groupID: 'U234',
  },
];


export default function GroupList() {

  return(
      <FlatList
      keyExtractor={ (item) => item.groupID }
      data = { groups }
      renderItem={( {item} )=>( 
        <GroupItem group={ item }/>
      )}/>

  )
}

