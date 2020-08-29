import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function NaviButton({ onPress, iconName, style, size }){
  return(
  <TouchableOpacity
    style={style}
    onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={size} />
  </TouchableOpacity>
  )
}
