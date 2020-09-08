import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  ThreadItem from './ThreadItem';
// import { styles } from '../stylesheets/styles';

const threads = [
  {
    groupName: 'Thon 2020',
    userName: 'Jimmy Wei',
    threadTitle: 'For the kid!!',
    content: 'long_text',
    numThumbsups: 20,
    numComments: 10,
    groupID: 'U123',
    userID: 'Y123',
    threadID: 'T123',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  },
  {
    groupName: 'ERO',
    userName: 'Tim Wang',
    threadTitle: 'Members recruitment',
    content:'long_text',
    numThumbsups: 100,
    numComments: 20,
    groupID: 'U234',
    userID: 'Y234',
    threadID: 'T234',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  },
  {
    groupName: 'ERO',
    userName: 'Tim Wang',
    threadTitle: 'Members recruitment',
    content:'long_text',
    numThumbsups: 100,
    numComments: 20,
    groupID: 'U234',
    userID: 'Y234',
    threadID: 'T345',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  }, {
    groupName: 'ERO',
    userName: 'Tim Wang',
    threadTitle: 'Members recruitment',
    content:'long_text',
    numThumbsups: 100,
    numComments: 20,
    groupID: 'U234',
    userID: 'Y234',
    threadID: 'T456s',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  }, 
];


export default function ThreadList({navigation,scrollEnabled}) {

  return(
      <FlatList
        scrollEnabled = {scrollEnabled}
        keyExtractor={ (item) => item.threadID }
        data = { threads }
        renderItem={( {item} )=>( 
          <ThreadItem thread={ item } navigation={ navigation }/>
        )}
      />

  )
}

