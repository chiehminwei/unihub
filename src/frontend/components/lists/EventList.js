import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventItem from './EventItem';
// import { styles } from '../stylesheets/styles';

const events = [
  {
    eventName: 'Thon club fundraising',
    groupName: 'Group THON 2020',
    tags: [ '#thon', '#FTK', '#fundraising'],
    numMessages: 10,
    numGoing: 10,
    eventLocation: 'Online',
    eventID: 'U123',
    eventDate: 'Monday July 3',
    uri: 'https://picsum.photos/700',
    description: 'Cool event',
  },
  {
    eventName: 'GoGOGO',
    groupName: 'Group THON 2020',
    tags: [ '#thon', '#FTK', '#fundraising'],
    numMessages: 10,
    numGoing: 10,
    eventLocation: "Tim's House",
    eventID: 'U234',
    eventDate: 'MONDAY JULY 3',
    uri: 'https://picsum.photos/700',
    description: 'Cool event no no no',
  },
];


export default function EventList({ navigation }) {

  return(
    <FlatList
      keyExtractor={ (item) => item.eventID }
      data = { events }
      renderItem={({ item }) => <EventItem navigation={ navigation } event={ item }/>}
    />
  )
}

