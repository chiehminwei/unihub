import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


function Icon({ iconFamily, iconName, size }){
  if (iconFamily === 'material')
  return <MaterialIcons name={iconName} size={size} />
  else if (iconFamily === 'materialCommunity')
  return <MaterialCommunityIcons name={iconName} size={size} />
}

export function NaviButton({ onPress, iconName, style, size ,iconFamily}){
  return(
  <TouchableOpacity
    style={style}
    onPress={onPress}>
      <Icon iconName={iconName} iconFamily={iconFamily} size={size}/>
  </TouchableOpacity>
  )
}

