import React,{ useState, Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Overlay, AnimatedRegion, Animated } from 'react-native-maps';
import EventItem from '~/components/lists/EventItem';
import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-snap-carousel';




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
    latlng: { latitude: 37.78925, longitude: -122.4364 },
    description: 'WTF!',
    uri: 'https://picsum.photos/700',
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
    latlng: { latitude: 37.78825, longitude: -122.4324 },
    description: 'ftw!',
    uri: 'https://picsum.photos/700',
  },
  {
    eventName: 'HIHIHI',
    groupName: 'Group THON 2020',
    tags: [ '#thon', '#FTK', '#fundraising'],
    numMessages: 10,
    numGoing: 10,
    eventLocation: "Tim's House",
    eventID: 'U234',
    eventDate: 'MONDAY JULY 3',
    latlng: { latitude: 37.78325, longitude: -122.4314 },
    description: 'ftw!',
    uri: 'https://picsum.photos/700',
  },
  {
    eventName: 'XIXIXIXI',
    groupName: 'Group THON 2020',
    tags: [ '#thon', '#FTK', '#fundraising'],
    numMessages: 10,
    numGoing: 10,
    eventLocation: "Tim's House",
    eventID: 'U234',
    eventDate: 'MONDAY JULY 3',
    latlng: { latitude: 37.78525, longitude: -122.4384 },
    description: 'ftw!',
    uri: 'https://picsum.photos/700',
  },
];
class MyMapCard extends Component {

 
  constructor(props){
      super();
      this.state = {
        // activeIndex:0,
        events: props.events
    }
  }


  render() {
    const { navigaiton, setIndex } = this.props
    const windowWidth = Dimensions.get('window').width;
      return (
          <View style={{ position:'absolute', top: 0, right: 0, flexDirection:'row', justifyContent: 'center' }}>
              <Carousel
                layout={"default"}
                ref={ref => this.carousel = ref}
                data={this.state.events}
                sliderWidth= {300}
                itemWidth={0.9*windowWidth}
                containerCustomStyle ={{ paddingBottom: 20}}
                renderItem={({ item }) => <EventItem navigation={ navigaiton } event={ item }/>}
                onSnapToItem = { index => setIndex(index) } />
          </View>
      );
  }
}

export default class MapContent extends Component {
      state = {
        events: [ ...events ],
        region: this.getInitialState().region,
        // markers: [
        //   {
        //     latlng: { latitude: 37.78825, longitude: -122.4324 },
        //     title: 'Cool',
        //     id: 'u123',
        //     description: 'WTF!',
        //   },
        //   {
        //     latlng: { latitude: 37.78925, longitude: -122.4364 },
        //     title: 'Cool',
        //     id: 'u234',
        //     description: 'WTF!',
        //   }
        // ]
      }
  

  getInitialState() {
    return {
      region: new AnimatedRegion({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }),
    };
  }

  onRegionChange(region) {
    this.state.region.setValue(region);
  }

  setIndex = index => {
    const { events } = this.state;
    const region = {
      ...events[index].latlng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    this.onRegionChange(region);
  }
      
  render() {
    const sliderWidth = 1000;
    const itemWidth = 200;
    const { navigation } = this.props;
    return (
      <View style={{ flex:1 }}>
        
        <Animated
          style={styles.mapStyle}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.events.map(event => (
            <Marker
              key={event.eventID}
              coordinate={event.latlng}
              title={event.eventName}
              description={event.description}
            />
          ))}
         
        </Animated>
        <MyMapCard setIndex={this.setIndex} events={events} navigaiton={navigation}/>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

