import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList
} from "react-native";
import Constants from "expo-constants";
import ThreadItem from './ThreadItem';
import GroupItem from './GroupItem';
import { Divider } from 'react-native-paper'
import { withFirebaseHOC } from "~/../firebase";


const threads = [
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
  },
  {
    groupName: 'ERO',
    userName: 'Tim Wang',
    threadTitle: 'Members recruitment',
    content:'long_text',
    numThumbsups: 100,
    numComments: 20,
    groupID: 'U234',
    userID: 'Y234',
    threadID: 'T234',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  },
  {
    groupName: 'ERO',
    userName: 'Tim Wang',
    threadTitle: 'Members recruitment',
    content:'long_text',
    numThumbsups: 100,
    numComments: 20,
    groupID: 'U345',
    userID: 'Y345',
    threadID: 'T345',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  }, {
    groupName: 'ERO',
    userName: 'Tim Wang',
    threadTitle: 'Members recruitment',
    content:'long_text',
    numThumbsups: 100,
    numComments: 20,
    groupID: 'U456',
    userID: 'Y456',
    threadID: 'T456',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  }, 
];

function DiscoverList({ navigation, firebase }) {
  const [ groups, setGroups ] =  useState([]);
  useEffect(() => {
    const unsubscribe = firebase.getGroups(setGroups);
    return () => {
      unsubscribe();
    }
  })
 
  return(
    <SectionList 
      renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 'bold' }}>{title}</Text>} 
      sections={[ 
        { title: 'Trending groups', data: groups, renderItem: ({ item }) =>  <GroupItem group={ item } navigation={ navigation }/> }, 
        { title:'Group threads',data: threads, renderItem: ({ item }) =>  <ThreadItem thread={ item } navigation={ navigation }/>}, 
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
    />
  )
}

export default withFirebaseHOC(DiscoverList);

 
  
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });
  
  
      {/* <FlatList
      keyExtractor={ (item) => item.groupID }
      data = { groups }
      renderItem={( {item} )=>( 
        <GroupItem group={ item } navigation={ navigation }/>
      )}/> */}
