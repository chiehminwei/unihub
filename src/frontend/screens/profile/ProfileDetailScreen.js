import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export function ProfileDetailScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor:'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ProfileDetail</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeApp')}>
            <Text>
              Go back
            </Text>
        </TouchableOpacity> 
    </View>
  );
}