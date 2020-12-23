import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, userNavigation } from '@react-navigation/native'


export function BackButton({title}){
  const navigation =useNavigation()
  return(
      <TouchableOpacity
        style={ styles.buttonContainer }
        onPress={()=> navigation.goBack()}>
            <MaterialIcons color= 'grey' name='arrow-back' size={25} />
           <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer:{
    marginLeft:16,
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center'
  },

  buttonTitle:{
    fontFamily:'Avenir-Light',
    fontWeight:'bold',
    fontSize: 16,
    color: 'grey'
  }

}) 