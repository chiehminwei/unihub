import React from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { withFirebaseHOC } from "~/../firebase/config/Firebase";
import { Text, Image } from 'react-native-elements';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.`
const thread = 
  {
    groupName: 'Thon 2020',
    userName: 'Jimmy Wei',
    threadTitle: 'For the kid!!',
    content: 'long_text',
    numThumbsups: 20,
    numComments: 10,
    groupID: 'U123',
    userID: 'Y123',
    threadID: 'T123',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  }
const ThreadDetailScreen = ({ threadID, navigation, firebase }) => {
  // const event = firebase(eventID)
  // const {
  // 	hostName,
  // 	groupName,
  // 	numMembers,
  //   availability,
  // 	groupID,
  //   description,
  //   uri
  // } = group;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.groupName}>
        	{ thread.groupName }
        </Text>
        <Text>
          { thread.threadTitle }
        </Text>
        <Text style={styles.userName}>
        	{ thread.userName }
        </Text>
        <Image          
        	source={ thread.uri }
        	style={ styles.image }
        	PlaceholderContent={<ActivityIndicator />}
        />

        <Text style={styles.description}>
          { thread.content }
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(ThreadDetailScreen);

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
  groupName: {

  },
  hostName: {

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