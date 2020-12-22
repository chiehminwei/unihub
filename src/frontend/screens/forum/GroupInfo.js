<<<<<<< HEAD
import React from 'react';
import { Text, View, Button, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
=======
import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
>>>>>>> 6833d4804e83e270672c71733e1e344679d48d0d
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles';
import MemberItem from '~/components/lists/MemberItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native-elements'
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { GroupContext } from '~/navigation/GroupProvider';
import { withFirebaseHOC } from "~/../firebase";


const shownListLength = 10
const screenWidth = Dimensions.get('window').width
const user = {
  userName: 'Eric Li',
  numGroups: 10,
  numFriends: 10,
  userID: 'Uu123',
  isAdmin: true, 
  major: 'Mechanical Enginnering',
  uri: 'https://picsum.photos/700',
  description: 'Cool Guy',
  classyear: 2020
}

const users = [
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
    userName: 'Eric Li',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu123',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },
  
];

let rowsOfList = user.length >=12 ?  3  :  Math.ceil((users.length+1)/4)
let listheight = 80 * rowsOfList

function SettingButton ({title, subTitle, onPress}) {
  return(
    <TouchableOpacity style={{height:50, flexDirection:'row', alignItems:'center', alignSelf:'stretch'}}onPress={onPress}>
      <Text 
        style={{
          flex:1,
          marginLeft: 16,
          fontFamily:'Avenir-Light',
          fontWeight:'bold',
          fontSize:18}}>
            { title }
      </Text>
      <View style={{flex:1, flexDirection:'row',alignItems:'center', justifyContent:'flex-end', paddingRight:16}}>
        <Text style={{
          fontFamily:'Avenir-Light',
          fontWeight:'200',
          fontSize:14 }}>
            { subTitle }
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  )
}

function RemoveUserButton () {
  return(
  <View>
    <TouchableOpacity 
      style={{
        alignContent:"center", 
        alignItems:'center', 
        marginHorizontal: screenWidth*0.025, 
        width: screenWidth*0.2,
        height: 80
      }}
      onPress={()=> alert('remove user page')}>
      <Image 
        source={require('../../../../assets/remove-user.png')}
        style={{
          borderRadius: 25,
          width: 50,
          height: 50,
        }}
      />
      <Text 
        style={{
          fontFamily:'Avenir-Light',
          fontWeight:'500',
          fontSize:12
        }}
      >
        Remove User
      </Text>
    </TouchableOpacity>
  </View>
  )
}

function GroupInfo({ route, firebase }) {
  const { contextGroupID } = route.params;
  const groupID = contextGroupID;
  const [ members, setMembers ] = useState([]);
  const [ isAdmin, setIsAdmin ] = useState(false);
  const [ group, setGroup ] = useState({});
  const userInfo = firebase.getCurrentUserInfo();

  const disbandGroup = () => {
    firebase.disbandGroup(groupID);
  }

  const quitGroup = () => {
    firebase.quitGroup(userInfo.uid, groupID);
  }

  useEffect(() => {
      const userInfo = firebase.getCurrentUserInfo();
      const memberUnsubscribe = firebase.getMembers(groupID, setMembers);
      const adminUnsubscribe = firebase.userIsAdmin(userInfo.uid, groupID, setIsAdmin);
      const groupUnsubscribe = firebase.getGroup(groupID, setGroup);

      return () => {
        memberUnsubscribe();
        adminUnsubscribe();
        groupUnsubscribe();
      }
    }, [firebase]);

  const rowsOfList = members.length >=12 ?  3  :  Math.ceil((members.length+1)/4)
  const listheight = 80 * rowsOfList
  return (
    <SafeAreaView style={[screenStyles.safeArea,{ backgroundColor:'white' }]} edges={['right','left']}>
      <ScrollView style={{flex:1, alignSelf:'stretch'}}>
        <View style={{backgroundColor:"white"}}>
        <Text style={styles.title}>
            Members
        </Text>
        <Divider style={[styles.thinDivider,{marginBottom: 10}]}/>
          { 
          //  check nunber of members 
            members.length > shownListLength ?
            (
              <View style={styles.listContainerExtend}> 
                <View style = {styles.avatorList}>
                  
                  { members.slice(0,shownListLength).map( item  =>  <MemberItem name={item.userName} uri={item.uri} onPress={()=> alert('navigate to profile')}/>) }
                  {/* check whether user is groupadmin */}
                  { isAdmin && (<RemoveUserButton onPress={()=>alert('remove user from a new page of user list')}/>) }
                </View>  
                <Divider style={{height:1}}/>
                <Button style ={styles.longButton} title={'Show All Members'} onPress={()=> alert('SHOW ALL USERS')}/>
              </View>
            ) : 
            (
              <View style={{height: listheight , width:screenWidth}}> 
                <View style = {{ flexDirection:'row', alignItems:'flex-start',flexWrap:'wrap',alignSelf:'flex-start'}}>
                  { members.map( item  =>  <MemberItem name={item.userName} uri={item.photoURL} onPress={()=> alert('navigate to profile')}/>) }
                  {/* check whether user is groupadmin */}
                  { isAdmin && (<RemoveUserButton onPress={()=>alert('remove user from a new page of user list')}/>) }
                </View>  
              </View>
            )
          }
          </View>
          <Divider style={styles.thickDivider}/>
          <Text style={styles.title}>
            Settings
          </Text>
          <Divider style={styles.thinDivider}/>
          <SettingButton 
            title={'Group Name'}
            subTitle={group.groupName || 'Not Set'}
            onPress= {()=> 
              {
                isAdmin ? alert('navigate to edit screen') : alert('You are not the group owner');
              }
            }
          />
          <Divider style={styles.thinDivider}/>
          <SettingButton 
            title={group.groupNotice || 'Group Notice'}
            subTitle={'Not Set'}
            onPress= {()=> 
              {
                isAdmin ? alert('navigate to edit screen') : alert('You are not the group owner');
              }
            }
          />
          <Divider style={styles.thickDivider}/>
          {
            isAdmin ?      
            <Button style ={{ height: 50, width: screenWidth, color:'whtie'}} title ='Delete this Group' onPress={disbandGroup}/>
            : 
            <Button style ={{ height: 50, width: screenWidth, color:'whtie'}} title ='Leave this Group' onPress={quitGroup}/>
          }
         <Divider style={styles.thickDivider}/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(GroupInfo);
