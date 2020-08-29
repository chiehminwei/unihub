import React from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { withFirebaseHOC } from "~/../firebase/config/Firebase";
import { Text, Image } from 'react-native-elements';

const long_text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.`

const event = {
  	authorName: 'Tim Wang',
    eventName: 'Thon club fundraising',
    groupName: 'Group THON 2020',
    tags: [ '#thon', '#FTK', '#fundraising'],
    numMessages: 10,
    numGoing: 10,
    eventLocation: 'Online',
    eventID: 'U123',
    eventDate: 'Monday July 3',
    uri: 'https://picsum.photos/700',
    description: long_text,
};

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.authorName}>
        	{ authorName }
        </Text>
        <Text h4 style={styles.eventName}>
        	{ eventName }
        </Text>
        <Text style={styles.groupName}>
        	{ groupName }
        </Text>
        <Image          
        	source={{ uri }}
        	style={ styles.image }
        	PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.eventDate}>
        	{ eventDate }
        </Text>
        <Text style={styles.eventLocation}>
        	{ eventLocation }
        </Text>
        <Text style={styles.description}>
          { description }
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(EventDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 42,
  },
  authorName: {

  },
  eventName: {

  },
  groupName: {

  },
  image: {
  	width: 100,
  	height: 100
  },
  eventDate: {

  },
  eventLocation: {

  },
  description: {

  },
  
});