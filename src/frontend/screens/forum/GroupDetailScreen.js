import React from 'react';
import { Button, StyleSheet, ScrollView, TouchableOpacity, View, Text, ActivityIndicator, Image, Dimensions } from 'react-native';
import { withFirebaseHOC } from "~/../firebase";
import  PrivateScreen  from '~/screens/forum/PrivateScreen';
import  PublicScreen from './PublicScreen';
import ThreadList from '../../components/lists/ThreadList';
import { Divider } from 'react-native-paper';


const deviceWidth = Dimensions.get('window').width;
const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
const user =
  {
    userName: 'Eric Li',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu4256',
    major: 'Mechanical Enginnering',
    userUri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  }

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
  const {
    userName,
    numGroups,
    numFriends,
    userID,
    major,
    userUri,
    
    classyear,
  } = user
  return (
      <ScrollView style={styles.scrollView}>
        <View style={{flex:1, alignContent:'stretch',alignItems:'center'}}>

          {/* group info */}
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



            {/* about */}
            <Text style={{alignSelf:'flex-start', 
                          marginTop: 20,
                          marginLeft:16,
                          fontFamily:'Avenir-Light',
                          fontWeight:'bold',
                          fontSize:24 }}>
              About
            </Text>
            <Text style={[styles.description,{marginHorizontal:16}]}>
              { longText }
            </Text>

          

            {/* public or private */}
          <View style={{ flex:1, alignSelf:'flex-start'}}>
            <GroupContent availability={availability}/>
          </View>


              




            {/* Activities */}
          
          
          <Text style={{alignSelf:'flex-start', 
                          marginTop: 20,
                          marginLeft:16,
                          fontFamily:'Avenir-Light',
                          fontWeight:'bold',
                          fontSize:24 }}>
              Activities
          </Text>
          <View style = {{
            flex:1, 
            flexDirection: 'row', 
            alignItems:'center', 
            alignContent:'flex-start', 
            justifyContent:"flex-start", 
            backgroundColor:'#f1f7f8',
            padding: 5
            }}>
            <TouchableOpacity style={{flex:1}} onPress={() => alert('To profile') }>
              <Image source={{uri: userUri }}
                    style={{
                      borderWidth: 2,
                      borderColor:'#bbdadf',
                      borderRadius: 30,
                      width: 50,
                      height: 50,
                      margin: 10}}/>
            </TouchableOpacity>
              <TouchableOpacity style={{flex: 4, marginLeft:5}} onPress= {() => alert('to create thread within current group')}>
                 
                <Text style={{fontFamily:'Avenir-Light',
                              fontSize:18,
                              color:'grey',
                              marginTop:20,
                              fontWeight:'600',
                              textDecorationLine: 'underline',
                              }}>
                  Hi Yufan, wanna share something?
                </Text>
              </TouchableOpacity>
          </View>

          <ThreadList />
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