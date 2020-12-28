import React,{useState, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  ThreadItem from './ThreadItem';
// import { styles } from '../stylesheets/styles';


export default function ThreadList({ navigation, scrollEnabled, threads }) {

  return(
      <FlatList
        scrollEnabled = {scrollEnabled}
        keyExtractor={ (item) => item.postID }
        data = { threads }
        renderItem={( {item} )=>( 
          <ThreadItem thread={ item } navigation={ navigation }/>
        )}
      />

  )
}

