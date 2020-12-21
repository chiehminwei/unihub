import React,{ useState, Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView, FlatList, SectionList}  from 'react-native';
import EventItem from './EventItem';
import KeyEventItem from './KeyEventItem'
import { Divider } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MyCarousel from './MyCarousel'
// import { styles } from '../stylesheets/styles';
const keyevents = [
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
]
const events = [
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
  {
    eventName: 'Hi',
    groupName: 'EROooo',
    tags: [ '#Billiards', '#Hub' ],
    numMessages: 10,
    numGoing: 10,
    eventLocation: 'WTF',
    eventID: 'U3456',
    eventDate: 'Friday JULY 3',
    uri: 'https://picsum.photos/700',
    description: 'Cool event no no no',
  },
];
const windowWidth = Dimensions.get('window').width;

export default function EventList({ navigation, scrollEnabled }) {

  return(
    <View style={{flex : 1 , alignContent:'center', alignItems:'stretch', width: windowWidth }}>
      <ScrollView style={{flex: 8, alignContent:'center',width: windowWidth} }>
        <View style = {{flex:1, width:windowWidth}}>
          <MyCarousel
                    // layout={"default"}
                    // data={entries}
                    // // item={item}
                    // sliderWidth= {windowWidth}
                    // itemWidth={windowWidth}
                    // containerCustomStyle ={{ paddingBottom: 20}} 
                    // renderItem={({item}) => 
                    //   <KeyEventItem navigation={ navigation } event={item}/>}
                    // onSnapToItem={(index) => this.setState({ activeSlide: index }) }

                  /> 
        </View>
        <View style={{flexDirection:'row', alignContent: 'center', alignItems:'center', justifyContent:'space-between'}}>
          <Text style={{marginLeft:16, fontFamily:'Avenir-Light', fontSize: 20, fontWeight: 'bold'}}>Recommended</Text>
        </View>
          {/* {  
            events.map(item =>  <EventItem  navigation={ navigation } event={ item }/>)
          } */}
          <FlatList
            data={events}
            renderItem={({ item }) =>  <EventItem navigation={ navigation } event={ item }/>}
            keyExtractor={item => item.eventID}
          />
          {/* <SectionList 
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
      /> */}
      </ScrollView>
      
      </View>
  )
}

