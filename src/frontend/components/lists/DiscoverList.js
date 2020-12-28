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


function DiscoverList({ navigation, firebase, threads }) {
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
