import React from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
import { styles } from '../../stylesheets/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export function ForumScreenHeader() {
  const navigation = useNavigation();
  return (
    <View 
      style={{ 
          flex: 1,
          backgroundColor: '#F3F3F3', 
          alignSelf: 'stretch', 
          textAlign: 'center', 
      }}
    >
      <View style={{flexDirection:'row', flex:1,justifyContent:'space-between',alignItems:'center'}}>
        <Text style={styles.forum}> Forum </Text>
        <TouchableOpacity
          style={styles.search}
          onPress={() => navigation.navigate('Search')}>
            <MaterialIcons name="search" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.creategroup}
          onPress={() => navigation.navigate('CreateGroup')}>
            <MaterialCommunityIcons name="plus-circle" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

 