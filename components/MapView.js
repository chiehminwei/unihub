import React,{ useState, Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import EventItem from './lists/EventItem';
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
  },
];

export default class MapContent extends Component {
  state = {
    events: [ ...events ],
    region: this.getInitialState(),
    markers: [
      {
        latlng: { latitude: 37.78825, longitude: -122.4324 },
        title: 'Cool',
        description: 'WTF!',
      }
    ]
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
    return (
      <View style={styles.container}>
        {/* <View style={{ height: 200}}>
          <Carousel
            layout={'default'}
            data={this.state.events}
            renderItem={({ item }) => <EventItem event={ item }/>}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </View> */}
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.markers.map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
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