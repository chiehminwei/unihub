import React,{ useState, Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Overlay } from 'react-native-maps';
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
        activeIndex:0,
        events: props.events
    }
  }


  render() {
    const { navigaiton } = this.props
      return (
          <View style={{ position:'absolute', top: 0, right: 0, flexDirection:'row', justifyContent: 'center' }}>
              <Carousel
                layout={"default"}
                ref={ref => this.carousel = ref}
                data={this.state.events}
                sliderWidth= {300}
                itemWidth={370}
                containerCustomStyle ={{ paddingBottom: 20}}
                renderItem={({ item }) => <EventItem navigation={ navigaiton } event={ item }/>}
                onSnapToItem = { index => this.setState({activeIndex:index}) } />
          </View>
      );
  }
}

export default class MapContent extends Component {
      state = {
        events: [ ...events ],
        region: this.getInitialState(),
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
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }
      
  render() {
    const sliderWidth = 1000;
    const itemWidth = 200;
    const { navigation } = this.props;
    return (
      <View style={{flex:1    }}>
        
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.events.map(events => (
            <Marker
              key={events.eventID}
              coordinate={events.latlng}
              title={events.eventName}
              description={events.description}
            />
          ))}
         
        </MapView>
        <MyMapCard events={events} navigaiton={navigation}/>
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

