import React from "react";
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

const groups = [
  {
    hostName:'Jimmy',
    groupName: 'Group THON 2020',
    numMembers: 10,
    availability: "Public",
    groupID: 'U123',
    description: 'long_text',
    uri:'https://picsum.photos/700',
  },
  {
    hostName:'Timmy',
    groupName: 'Gogogo',
    numMembers: 10,
    availability: "Private",
    groupID: 'U234',
    description: 'long_text',
    uri:'https://picsum.photos/700',
  },
  {
    hostName:'Timmy',
    groupName: 'Gogogo',
    numMembers: 10,
    availability: "Private",
    groupID: 'U234',
    description: 'long_text',
    uri:'https://picsum.photos/700',
  },{
    hostName:'Timmy',
    groupName: 'Gogogo',
    numMembers: 10,
    availability: "Private",
    groupID: 'U234',
    description: 'long_text',
    uri:'https://picsum.photos/700',
  },
];

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
    groupID: 'U234',
    userID: 'Y234',
    threadID: 'T234',
    publishTime: 'MONDAY JULY 3',
    uri:'https://picsum.photos/700',
  }, {
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
];
function Item({item,navigation}) {
   
if ( item === 'Hot threads') return <ThreadItem thread={item} navigation={navigation}/>
// else if (item === 'Popular Groups')
return <GroupItem group={item} navigation={navigation}/>

}

export default function DiscoverList({navigation}) {
 
  return(
    <SectionList 
   renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 'bold' }}>{title}</Text>} 
   sections={[ 
     { title: 'Groups', data: groups, renderItem: ({ item }) =>  <GroupItem group={ item } navigation={ navigation }/> }, 
     { title: 'Threads', data: threads, renderItem: ({ item }) =>  <ThreadItem thread={ item } navigation={ navigation }/>}, 
    ]} 
   keyExtractor={(item, index) => item.name + index} 
 />
    )
  }


 
  
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
