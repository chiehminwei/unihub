import React, { useContext } from 'react';
import { Alert, View, TouchableOpacity,StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import { withFirebaseHOC, auth } from '~/../firebase';
import { AuthUserContext } from '~/navigation/AuthUserProvider';

//********* User Name Update*************//
const user=
  {
    userName: 'Yufan Wang',
    userID: 'U123',
    birthDate: 'Monday July 3',
    uri: 'https://picsum.photos/700',
    bio: 'Cool guys never debug',
    interests : [ 'Dance', 'Billiards', 'Career'],
    contact: 'yxw5555@psu.edu',
    numPosts: 34,
    numGroups: 5,
    numFriends: 233,
    availability: 'public',
    major: 'Mechanical Engineering',
    classYear:'2020',
  }
function NumDisplay({number,title, onPress}){
  return(
    <TouchableOpacity style={{flex:1, alignContent:'space-between', marginHorizontal:10, alignItems:'center'}} onPress={onPress}>
        <Text style={{fontSize: 20,fontWeight:'bold',fontFamily: 'Avenir-Light'}}>{number}</Text>
        <Text style={{fontSize: 16,fontFamily: 'Avenir-Light', color: 'grey'}}>{title}</Text>
    </TouchableOpacity>
  )
}   

function ProfileScreenHeader({ firebase }) {
  const {
    userName,
    userID,
    birthDate,
    uri,
    bio,
    contact,
    interests, 
    numPosts,
    numGroups,
    numFriends,
    availability, 
    major,
    classYear,
  } = user;
  const navigation = useNavigation();
  const { setUser } = useContext(AuthUserContext);

  async function handleSignOut() {
    try {
      await firebase.logout();
    } catch (error) {
      console.log(error);
    }
  }

  async function createGroup() {
    const userInfo = firebase.getCurrentUserInfo()
    const group = {
      groupName: 'Cool Kids Club',
      admin: userInfo,
    }
    try {
      await firebase.createGroup(group);
    } catch (error) {
      console.log(error);
    }
  }

  async function disbandGroup() {
    const groupID = '3U4ig2DGAUVqAC3OFKHe';
    await firebase.disbandGroup(groupID);
  }

  async function joinGroup() {
    const userInfo = firebase.getCurrentUserInfo() 
    const groupID = '3U4ig2DGAUVqAC3OFKHe';
    await firebase.joinGroup(userInfo, groupID);
  }

  async function quitGroup() {
    const { uid } = auth.currentUser;
    const groupID = '3U4ig2DGAUVqAC3OFKHe';
    await firebase.quitGroup(uid, groupID);
  }

  async function acceptMember() {
    const { uid } = auth.currentUser;
    const groupID = '3U4ig2DGAUVqAC3OFKHe';
    await firebase.acceptMember(uid, groupID);
  }

  async function rejectMember() {
    const { uid } = auth.currentUser;
    const groupID = '3U4ig2DGAUVqAC3OFKHe';
    await firebase.rejectMember(uid, groupID);
  }

  async function handleLogin() {
    try {
      await setUser(null)
    } catch (error) {
      console.log(error);
    }
  }
  
  return(
    /* top frame */
    <View
      style={{flex:2, backgroundColor:'#bad4da', justifyContent:"center", alignItems:"center",}}>
        
        {/* profile image */}
        <Image source={{ uri }}
               style={{ flex:1, width: 90, height: 90,minHeight:90,minWidth:90, maxHeight:90, maxWidth: 90 , marginTop: 30, marginBottom: 30, borderRadius:45, borderWidth: 2, borderColor:'grey'}}
        />

        
      <View style={{alignItems:'center',alignContent:'center', marginTop: 5, maxWidth: 290 }}>
        {/* User's full name */}
        <Text style = {styles.name}>
          {userName}
        </Text>

        {/* user's major class year */}
          <Text style = {{ fontFamily:'Avenir-Medium', color: '#1c7085'}}> 
            {major} · {classYear}
          </Text>
      </View>

        {/* user's bio */}
      <View style={{alignItems:'center',alignContent:'center', marginTop: 5, marginBottom: 15,  maxWidth: 290 }}>
          <Text Style = {styles.bio}>
            {bio}
          </Text>
      </View>

      <Button title="Create Group" onPress={createGroup} />
      <Button title="Disband Group" onPress={disbandGroup} />
      <Button title="Join Group" onPress={joinGroup} />
      <Button title="Quit Group" onPress={quitGroup} />
      <Button title="Accept Member" onPress={acceptMember} />
      <Button title="Reject Member" onPress={rejectMember} />

        {/* user's number */}
      <View style={{flexDirection:"row", marginVertical: 10}}>
        <NumDisplay number={numPosts} title='Posts' onPress={()=>navigation.navigate('ThreadCard')}/> 
        <NumDisplay number={numFriends} title='Friends' onPress={()=>alert('Friends list')}/> 
        <NumDisplay number={numGroups} title='Groups' onPress={()=>navigation.navigate('GroupScreen')}/> 
      </View>
     {/* blank space */}
    </View>
  );
}
 const styles=StyleSheet.create({
    name:{
      color: '#352F2f',
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Avenir-Book',
      fontWeight: '600'
    },
    bio:{
      fontSize: 12,
      textAlign: 'center',
      fontFamily: 'Avenir-Light'
    },
 })


export default withFirebaseHOC(ProfileScreenHeader);
