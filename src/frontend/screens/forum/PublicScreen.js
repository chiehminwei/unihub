import React from 'react';
import { Text, View, FlatList, Image,TouchableOpacity } from 'react-native';

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
    userID: 'Uu234',
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
];


const MemberItem = ({ name, uri }) => (
  <View>
    <TouchableOpacity 
      style={{
              alignContent:"center", 
              alignItems:'center', 
              margin:5, 
              width: 100
            }}
      onPress={()=> alert('navigate to profile')}>
      <Image source={{uri: uri }}
            style={{
                      borderRadius: 40,
                      width: 80,
                      height: 80,
                      margin: 10}}/>
      <Text style={{fontFamily:'Avenir-Light',
                    fontWeight:'500',
                    fontSize:16}}>
            {name}
      </Text>
    </TouchableOpacity>
  </View>
);


const MemberList = () => {
  const renderItem = ({ item }) => (
    <MemberItem name={item.userName} uri={item.uri} />
  );

  return(
    <View style={{flex:1}}>
      <FlatList
        data={user}
        renderItem={renderItem}
        keyExtractor={item => item.userID}
        horizontal = {true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}



export default function Publicscreen() {
  return (
    <View style={{flex:1, alignItems:'stretch',alignContent:'stretch'}}>
      <Text style={{alignSelf:'flex-start', 
                      marginTop: 20,
                      marginLeft: 16,
                      fontFamily:'Avenir-Light',
                      fontWeight:'bold',
                      fontSize:24 }}>
          Public
      </Text>
      <View style={{flex:1, alignContent:'stretch', alignItems:'stretch'}}>
      <MemberList/>
      </View>
    </View>
  );
}