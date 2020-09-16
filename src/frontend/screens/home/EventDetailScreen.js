import React from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, Dimensions, Image } from 'react-native';
import { withFirebaseHOC } from "~/../firebase/config/Firebase";
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import  EventTabNavigator  from '../../navigation/EventTabNavigator'




const deviceWidth = Dimensions.get('window').width;


function ResizeImage (uri)  {
  return(
    <View style={{flex: 1,
                marginVertical: 10,
                backgroundColor: 'blue',
                flexDirection: 'row',
                flexWrap: 'wrap'}}>
        <Image
          source={ uri }
          style={ styles.image }
          PlaceholderContent={<ActivityIndicator />}
          > 
        </Image>
    </View>
  )
  
}



const long_text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`

const event = {
  	authorName: 'TIM WANG',
    eventName: 'Thon club fundraising',
    groupName: 'THON 2020',
    tags: [ '#thon', '#FTK', '#fundraising'],
    numMessages: 10,
    numGoing: 10,
    eventLocation: 'Online',
    eventID: 'U123',
    eventDate: 'Monday July 3',
    uri: 'https://picsum.photos/700',
    description: long_text,
    comments: ''
};
function LocationLogo({location}){
  if (location === 'Online') return <MaterialIcons name='language'  size={25} color='grey'/>
  return <MaterialIcons name='location-on'  size={25} color='grey' />
} 


const EventDetailScreen = ({ eventID, navigation, firebase }) => {
  // const event = firebase(eventID)
  const {
  	authorName,
  	eventName,
  	groupName,
  	numMessages,
  	numGoing,
  	eventLocation,
  	eventDate,
  	uri,
  	description,
  } = event;

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.scrollView}>
        <View style={{flex:1}}>
          <ResizeImage          
            uri ={ uri }
          />
          <View style={{marginLeft:20 }}> 
            <View>
              <Text style={styles.eventName}>
                { eventName }
              </Text>
              <MaterialCommunityIcons name='calendar'  size={25}  color='grey'/>
            </View> 
            <Text style={styles.authorName}>
              by{'  '}{ groupName }{'  '}{ authorName }
            </Text>
          </View>

          <View style={{marginHorizontal:20}}>
            <View style={{margin:5, flexDirection:'row', alignContent:'center', alignItems:'center'}}>
              <MaterialCommunityIcons name='calendar'  size={25}  color='grey'/>
              <Text style={styles.eventInfo}>
                { eventDate }
              </Text>
            </View>
            <View style={{margin:5, flexDirection:'row', alignContent:'center', alignItems:'center'}}>
              <LocationLogo location = { eventLocation }/>
              <Text style={styles.eventInfo}>
                { eventLocation }
              </Text>
            </View>
            <Text style={styles.description}>
              { description }
            </Text>
          </View>
        </View>

        <View style={{ alignSelf: 'stretch', flex:1, marginTop: 50 }}>
          <EventTabNavigator />
        </View>
          
      </ScrollView>

      <FAB
        style={styles.fab}
        small
        icon="arrow-left"
        onPress={() => navigation.goBack()}/>
      </View>
  );
}

export default withFirebaseHOC(EventDetailScreen);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  sectiontitle:{
    fontFamily:'Avenir-Heavy',
    fontSize: 20,
    marginVertical: 5
  },
  authorName: {
    color:'#1c7085', 
    marginLeft:10,
    marginBottom:10,
    fontFamily:'Avenir-Book',
    fontSize: 10,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 1.5,
    lineHeight: 16,
    textTransform: "uppercase",
  },
  eventName: {
    fontFamily:'Avenir-Light',
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 5
    
  },
  groupName: {
    fontFamily:'Avenir-Light'
  },
  image: {
    width: deviceWidth,
    height: deviceWidth*0.75
  },
  eventInfo: {
    fontFamily:'Avenir-Light',
    fontSize:18,
    marginLeft:30
  },
  description: {
    fontFamily:'Avenir-Light',
    fontSize: 16,
    marginVertical:5,
    lineHeight: 24
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    top: 20,
    backgroundColor:'white'
  },
  
});