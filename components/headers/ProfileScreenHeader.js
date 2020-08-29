import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
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
      <View style={{flexDirection:'row', flex:1,alignItems:'center',margin:10}}>
            <View
            style={{height:70,width:70, flex:1.5, backgroundColor:'black',marginLeft:40,borderRadius:50}}>
            </View>
            <View style={{flex:7}}>
              <Text style={styles.name} >Yufan Wang</Text> 
            </View>
            <View style={{flex:1, alignItems:'flex-end',marginRight:15}}> 
              <TouchableOpacity
              onPress={() => navigation.openDrawer()}>
              <MaterialCommunityIcons name="menu" size={30} />
              </TouchableOpacity>
            </View>
      </View>
    </View>
  );
}

 