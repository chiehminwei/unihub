import React from 'react';
import { Button, StyleSheet, ScrollView, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native';
import { withFirebaseHOC } from "~/../firebase/config/Firebase";
import { Text, Image } from 'react-native-elements';
import  PrivateScreen  from '~/screens/forum/PrivateScreen';
import  PublicScreen from './PublicScreen';



const deviceWidth = Dimensions.get('window').width;
const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.`
const group = 
  {
    hostName:'Jimmy',
    groupName: 'Group THON 2020',
    numMembers: 10,
    availability: "Public",
    isPrivate: true,
    groupID: 'U123',
    description: 'longText',
    uri:'https://picsum.photos/700',
  }

function GroupContent({availability}){
  if (availability === 'Private') return <PrivateScreen/>
  return <PublicScreen/>
}  

const GroupDetailScreen = ({ groupID, navigation, firebase }) => {
  const  
  {
    hostName,
    groupName,
    numMembers,
    availability,
    // groupID,
    description,
    uri,
    isPrivate
  } = group

  return (
      <ScrollView style={styles.scrollView}>
        <View style={{flex:1, alignContent:'stretch',alignItems:'center',paddingHorizontal:16}}>
        <Image          
        	source={{ uri }}
        	style={ styles.image }
        	PlaceholderContent={<ActivityIndicator />}
        />
        <TouchableOpacity style={{marginTop:20}} onPress={ () => alert('to detail')}>
        <Text style={styles.groupName}>
        	{ groupName }
        </Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.groupInfo}>
            { availability } group · {numMembers} members
          </Text>
        </View>
        <TouchableOpacity style={{marginVertical:20, alignContent:"stretch"}} onPress={() => alert('join the group')}>
          <View style={{backgroundColor:'grey', 
                        width: deviceWidth*0.7,
                        alignItems:'center',
                        padding:10,
                        borderRadius:10}}>
            <Text style={{fontFamily:'Avenir-Light',
                          fontSize:18,
                          fontWeight:'600',
                          color:'white',
                          backgroundColor:'grey'}}>
              Join Group
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{alignSelf:'flex-start', 
                      marginTop: 10,
                      fontFamily:'Avenir-Light',
                      fontWeight:'bold',
                      fontSize:24 }}>
          About
        </Text>
        <Text style={styles.description}>
          { longText }
        </Text>
        <View style={{ flex:1, alignSelf:'flex-start'}}>
        <GroupContent availability={availability}/>
        </View>
        </View>
      </ScrollView>
  );
}

export default withFirebaseHOC(GroupDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 42,
  },
  groupName: {
    textAlign:'center',
    fontFamily:'Avenir-Light',
    fontWeight:'bold',
    fontSize:24,
  },
  hostName: {

  },

  image: {
    width: deviceWidth,
    height: deviceWidth*0.5
  },
  groupInfo: {
    textTransform: 'uppercase',
    fontFamily:'Avenir-Light',
    fontWeight:'500',
    color:'grey',

  },
  
});