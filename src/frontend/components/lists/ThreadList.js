import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThreadItem from './ThreadItem';
// import { styles } from '../stylesheets/styles';

const threads = [
  {
    threadTitle: 'Group THON 2020',
    tags: [ '#thon', '#FTK', '#fundraising'],
    numFollowers: 10,
    numGoing: 10,
    eventLocation: 'Online',
    groupID: 'U123',
    eventDate: 'Monday July 3',
  },
  {
    threadTitle: 'Group THON 2020',
    tags: [ '#thon', '#FTK', '#fundraising'],
    numFollowers: 10,
    numGoing: 10,
    eventLocation: "Tim's House",
    groupID: 'U234',
    eventDate: 'MONDAY JULY 3',
  },
];


export default function ThreadList() {

  return(
      <FlatList
        keyExtractor={ (item) => item.groupID }
        data = { threads }
        renderItem={( {item} )=>( 
          <ThreadItem thread={ item }/>
        )}
      />

  )
}

