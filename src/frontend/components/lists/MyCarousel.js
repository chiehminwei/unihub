import React , { Component } from 'react';
import { View , Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import KeyEventItem from './KeyEventItem'

const windowWidth = Dimensions.get('window').width;
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
];
export default class MyCarousel extends Component {


    state = {
      entries: events
    }
    get pagination () {
        const { entries , activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'white' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: 'grey'
                  
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render () {
      const { navigation } = this.props;
        return (
            <View>
                <Carousel
                  layout={"default"}
                  sliderWidth= {windowWidth}
                  itemWidth={windowWidth}
                  containerCustomStyle ={{ paddingBottom: 20}} 
                  data={this.state.entries}
                  renderItem={({item, index}) => <KeyEventItem navigation={ navigation } event={item}/>}
                  onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                />
                { this.pagination }
            </View>
        );
    }
}