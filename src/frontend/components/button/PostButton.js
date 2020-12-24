import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';



export function PostButton({navigation, onPress}){
  return(
    <TouchableOpacity style={ styles.postButton } onPress={onPress}>
    <Text style={ styles.postButtonText }>Post</Text>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  backButton:{
    marginLeft:16, 
  },
  postButton:{
    marginRight:16, 
    width: 70, 
    backgroundColor:'#bad4da', 
    borderRadius:5, 
    alignItems:'center', 
    justifyContent:'center',
    height:30
  },

  postButtonText:{
    fontFamily:'Avenir-Light',
    fontSize: 16,
    fontWeight:'bold',
    color: 'white'
  }
})