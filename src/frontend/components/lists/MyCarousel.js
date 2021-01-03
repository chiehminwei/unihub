import React , { Component } from 'react';
import { View , Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import KeyEventItem from './KeyEventItem'


const windowWidth = Dimensions.get('window').width;
const initialSlide = 0

export default class MyCarousel extends Component {
    state = {
      entries: this.props.events,
      activeSlide: initialSlide
    }
    get pagination () {
        const { entries , activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{marginTop:-40, backgroundColor: 'transparent' }}
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