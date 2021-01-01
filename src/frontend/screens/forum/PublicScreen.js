import React, { useContext } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GroupContext } from '~/navigation/GroupProvider';
import UserAvatar from 'react-native-user-avatar';

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

// console.log(members)
  return (
    <View style={styles.avatorListContainer}>
      <Text style={styles.title}>
          Members
      </Text>
      <View style={styles.avatarList}>
        { members.slice(0,shownListLength).map(item  =>  <UserAvatar size={50} key={item.uid} src={item.photoURL} name={item.displayName} onPress={()=> navigation.navigate('GroupInfo', { contextGroupID })}/>) }
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
  },
  title: {
    alignSelf:'flex-start', 
    marginTop: 20,
    marginLeft:16,
    fontFamily:'Avenir-Light',
    fontWeight:'bold',
    fontSize:24 
  },


})