import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function BackButton({navigation}){
  return(
      <TouchableOpacity
      // style={{ width: 50, height: 30, postion: 'absolute', display: 'flex',left: 50, top: 50, backgroundColor: 'grey', alignItems: 'center', borderRadius: 20}}
        onPress={()=> navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={25} />
      </TouchableOpacity>
  )
}

