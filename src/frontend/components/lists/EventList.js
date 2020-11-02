import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, FlatList, SectionList}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventItem from './EventItem';
import KeyEventItem from './KeyEventItem'
import { Divider } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
// import { styles } from '../stylesheets/styles';
const keyevents = [
  {
    eventName: 's'
  },
]
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
const windowWidth = Dimensions.get('window').width;

export default function EventList({ navigation, scrollEnabled }) {

  return(
    <View>
      {/* <View style={{flex:3, minHeight:300}}>
        <Carousel
              layout={"default"}
              data={events}
              sliderWidth= {windowWidth}
              itemWidth={windowWidth}
              containerCustomStyle ={{ paddingBottom: 20}}
              renderItem={({ item }) => <KeyEventItem navigation={ navigation } event={ item }/>}
            />
            </View> */}
    {/* <FlatList
      style={{borderTopLeftRadius:20, borderTopRightRadius:20}}
      scrollEnabled={ scrollEnabled }
      keyExtractor={ (item) => item.eventID }
      data = { events }
      renderItem={({ item }) => <EventItem navigation={ navigation } event={ item }/>}
    /> */}
      <SectionList 
        renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 'bold' }}>{title}</Text>} 
        sections={[ 
          { title: 'Trending',
            data: keyevents, 
            renderItem: 
              ({ item }) =>  
                <Carousel
                  layout={"default"}
                  data={events}
                  item={item}
                  sliderWidth= {windowWidth}
                  itemWidth={windowWidth}
                  containerCustomStyle ={{ paddingBottom: 20}} 
                  renderItem={({ item }) => 
                    <KeyEventItem navigation={ navigation } event={ item }/>}
                /> 
          }, 
          { 
            title:'Nearby', 
            data: events, 
            renderItem: ({ item }) =>  <EventItem navigation={ navigation } event={ item }/>
          },
          { 
            title:'Recommended for you', 
            data: events, 
            renderItem: ({ item }) =>  <EventItem navigation={ navigation } event={ item }/>
          },
        ]} 
        keyExtractor={(item, index) => item + index} 
        renderSectionHeader={({section}) => 
        <View style={{backgroundColor:'white'}}>
          <Divider style={{height:1}}/>
          <Text 
            style={{
              marginLeft:16,
              marginVertical:5,
              fontFamily:'Avenir-Light', 
              fontWeight:'bold', 
              fontSize: 24}}>
                {section.title}
          </Text>
        </View>}
      />
      </View>
  )
}

