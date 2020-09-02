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
const group = 
  {
    hostName:'Jimmy',
    groupName: 'Group THON 2020',
    numMembers: 10,
    availability: "Public",
    groupID: 'U123',
    description: 'longText',
    uri:'https://picsum.photos/700',
  }
const GroupDetailScreen = ({ groupID, navigation, firebase }) => {
  const  
  {
    hostName,
    groupName,
    numMembers,
    availability,
    // groupID,
    description,
    uri,
  } = group

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.groupName}>
        	{ groupName }
        </Text>
        <Text style={styles.hostName}>
        	{ hostName }
        </Text>
        <Image          
        	source={{ uri }}
        	style={ styles.image }
        	PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.description}>
          { availability }
        </Text>
        <Text style={styles.description}>
          { description }
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(GroupDetailScreen);

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