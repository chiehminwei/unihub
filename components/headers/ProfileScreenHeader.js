import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../stylesheets/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//********* User Name Update*************/

export function ProfileScreenHeader() {
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
      <View style={{flexDirection:'row'},styles.nameheader}>
            <View
            style={{height:25, flex:1,widith:25, backgroundColor:'black'}}>
            </View>
            <TouchableOpacity
            style={styles.calendar}
            onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons name="menu" size={25} />
          </TouchableOpacity>
            <Text style={styles.name}>Yufan Wang</Text> 
      </View>
    </View>
  );
}

 