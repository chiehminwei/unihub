import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GroupItem from './GroupItem';
// import { styles } from '../stylesheets/styles';
 
export default function GroupList({ navigation, groups }) {
  return(
      <FlatList
      keyExtractor={ (item) => item.groupID }
      data = { groups }
      renderItem={( {item} )=>( 
        <GroupItem group={ item } navigation={ navigation }/>
      )}/>

  )
}

