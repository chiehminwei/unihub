import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventItem from './EventItem';
// import { styles } from '../stylesheets/styles';

const events = [
  {
    eventName: 'Thon club fundraising',
    groupName: 'THON 2020',
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
    eventName: 'lets go GO',
    groupName: 'ERO',
    tags: [ '#Billiards', '#Hub' ],
    numMessages: 10,
    numGoing: 10,
    eventLocation: "Tim's House",
    eventID: 'U234',
    eventDate: 'Friday JULY 3',
    uri: 'https://picsum.photos/700',
    description: 'Cool event no no no',
  },
  {
    eventName: 'Hi',
    groupName: 'EROooo',
    tags: [ '#Billiards', '#Hub' ],
    numMessages: 10,
    numGoing: 10,
    eventLocation: 'WTF',
    eventID: 'U345',
    eventDate: 'Friday JULY 3',
    uri: 'https://picsum.photos/700',
    description: 'Cool event no no no',
  },
  {
    eventName: 'NO GOOD',
    groupName: 'ACE',
    tags: [ '#Sports', '#Hub' ],
    numMessages: 10,
    numGoing: 10,
    eventLocation: "Tim's House",
    eventID: 'U456',
    eventDate: 'Friday JULY 3',
    uri: 'https://picsum.photos/700',
    description: 'Cool event no no no',
  },
  {
    eventName: 'Have Fun',
    groupName: 'CSSA',
    tags: [ '#Billiards', '#Hub' ],
    numMessages: 10,
    numGoing: 10,
    eventLocation: "Hub",
    eventID: 'U567',
    eventDate: 'Friday JULY 3',
    uri: 'https://picsum.photos/700',
    description: 'Cool event no no no',
  },
];


export default function EventList({ navigation, scrollEnabled }) {

  return(
    <FlatList
      style={{borderTopLeftRadius:20, borderTopRightRadius:20}}
      scrollEnabled={ scrollEnabled }
      keyExtractor={ (item) => item.eventID }
      data = { events }
      renderItem={({ item }) => <EventItem navigation={ navigation } event={ item }/>}
    />
  )
}

