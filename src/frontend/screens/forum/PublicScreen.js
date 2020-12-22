import React, { useContext } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements';
import { GroupContext } from '~/navigation/GroupProvider';

// const user = [
//   {
//     userName: 'Eric Li',
//     numGroups: 10,
//     numFriends: 10,
//     userID: 'Uu123',
//     major: 'Mechanical Enginnering',
//     uri: 'https://picsum.photos/700',
//     description: 'Cool Guy',
//     classyear: 2020
//   },
// ];

const ThreeDot = ({onPress}) => (
  <View>
    <TouchableOpacity 
      style={{
        alignContent:"center", 
        alignItems:'center', 
        width: 40,
        height: 50,
        backgroundColor:'white'
      }}
      onPress={onPress}>
      <Image 
        source={require('../../../../assets/three-dot.png')}
        style={{ 
          backgroundColor:'#f1f7f8',
          borderColor:'white', 
          borderWidth: 3,            
          borderRadius: 25,
          width: 50,
          height: 50,
          
        }}
      />
    </TouchableOpacity>
  </View>
);


export default function Publicscreen({ members }) {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width
  const numAvatar = Math.floor((screenWidth - 32) / 40)
  const shownListLength = members.length >= numAvatar ? numAvatar-1 : members.length;
  const { contextGroupID } = useContext(GroupContext);


  return (
    <View style={{flex:1, alignItems:'stretch',alignContent:'stretch'}}>
      <Text 
        style={{
          alignSelf:'flex-start', 
          marginTop: 20,
          marginLeft: 16,
          fontFamily:'Avenir-Light',
          fontWeight:'bold',
          fontSize:24 
        }}
      >
          Members
      </Text>
      <View style={styles.avatarList}>
        { members.slice(0,shownListLength).map(item  =>  <Avatar size="medium" key={item.uid} rounded source={{uri: item.photoURL}} onPress={()=> navigation.navigate('GroupInfo', { contextGroupID })}/>) }
        { members.length >= numAvatar ? <ThreeDot onPress={() => navigation.navigate('GroupInfo', { contextGroupID })}/> : null }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarList: {
    flex:1, 
    flexDirection:'row', 
    alignContent:'stretch', 
    alignItems:'stretch',
    paddingHorizontal:16
  }


})