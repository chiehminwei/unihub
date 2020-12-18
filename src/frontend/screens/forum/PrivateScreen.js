import React from 'react';
import { Text, View } from 'react-native';


export default function PrivateScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <Text style={{alignSelf:'flex-start', 
                      marginTop: 10,
                      marginLeft: 16,
                      fontFamily:'Avenir-Light',
                      fontWeight:'bold',
                      fontSize:24 }}>
          Private
        </Text>
    </View>
  );
}