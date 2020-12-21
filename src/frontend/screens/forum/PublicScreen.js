import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'


const user = [
  {
    userName: 'Eric Li',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu123',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },
  {
    userName: 'Jimmy Wei',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu2334',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },
  {
    userName: 'Yufan Wang',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu456',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },
  {
    userName: 'Jimmy Wei',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu234',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },
  {
    userName: 'Jimmy Wei',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu234',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },
];


const screenWidth = Dimensions.get('window').width
const numAvator = Math.floor((screenWidth-32)/40)
const shownListLength = user.length >= numAvator ? numAvator-1 : user.length

const Avator = ({ name, uri, onPress }) => (
  <View>
    <TouchableOpacity 
      style={{
              alignContent:"center", 
              alignItems:'center', 
              width: 40,
              height: 50
            }}
      onPress={onPress}>
      <Image 
        source={{uri: uri }}
        style={{ 
          borderColor:'white', 
          borderWidth: 3,            
          borderRadius: 25,
          width: 50,
          height: 50,
          
        }}
      />
      {/* <Text style={{fontFamily:'Avenir-Light',
                    fontWeight:'500',
                    fontSize:12}}>
            {name}
      </Text> */}
    </TouchableOpacity>
  </View>
);

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


export default function Publicscreen() {
  const navigation = useNavigation();
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
      <View style={styles.avatorList}>
        { user.slice(0,shownListLength).map( item  =>  <Avator name={item.userName} uri={item.uri} onPress={()=> navigation.navigate('GroupInfo')}/>) }
        { user.length >= numAvator ? <ThreeDot onPress={() => navigation.navigate('GroupInfo')}/> : null }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatorList: {
    flex:1, 
    flexDirection:'row', 
    alignContent:'stretch', 
    alignItems:'stretch',
    paddingHorizontal:16
  }


})