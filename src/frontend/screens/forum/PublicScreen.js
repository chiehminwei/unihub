import React from 'react';
import { Text, View } from 'react-native';


export default function Publicscreen() {
  return (
    <View style={{flex:1, alignItems:'stretch',alignContent:'stretch'}}>
      <Text style={{alignSelf:'flex-start', 
                      marginTop: 10,
                      fontFamily:'Avenir-Light',
                      fontWeight:'bold',
                      fontSize:24 }}>
          Public
        </Text>
    </View>
  );
}