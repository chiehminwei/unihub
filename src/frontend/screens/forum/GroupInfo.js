import React from 'react';
import { Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles';
import MemberItem from '~/components/lists/MemberItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const shownListLength = 11
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
function SettingButton ({title, subTitle, onPress}) {
  return(
    <TouchableOpacity style={{height:50, flexDirection:'row', alignItems:'center', alignSelf:'stretch'}}onPress={onPress}>
      <Text 
        style={{
          flex:1,
          marginLeft: 16,
          fontFamily:'Avenir-Light',
          fontWeight:'bold',
          fontSize:20 }}>
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

function RemoveUserButton ({onPress}) {
  return(

    <TouchableOpacity 
      style={{
              alignContent:"center", 
              alignItems:'center', 
              margin: screenWidth*0.025, 
              width: screenWidth*0.2
            }}
      onPress={onPress}>
      {/* <Image source={{uri: uri }}
            style={{
                      borderRadius: 25,
                      width: 50,
                      height: 50,
                      margin: 10}}/> */}
      <MaterialCommunityIcons 
        style={{margin: 10}}
        name="minus-circle-outline" 
        size={50} 
        color="black" 
      />               
      <Text style={{fontFamily:'Avenir-Light',
                    fontWeight:'500',
                    fontSize:12}}>
            remove user
      </Text>
    </TouchableOpacity>
  )
}

export default function GroupInfo() {
  return (
    <SafeAreaView style={[screenStyles.safeArea,{backgroundColor:'white'}]} edges={['right','left']}>
      <View style={{ flex: 1, alignSelf:'stretch'}}>
        <Text style={{  alignSelf:'flex-start', 
                        marginLeft: 16,
                        fontFamily:'Avenir-Light',
                        fontWeight:'bold',
                        fontSize:20 }}>
            Member
        </Text>
          { 
          //  check nunber of members 
            users.length >= shownListLength ?
            (
              <View style={{flex:1}}> 
                <View style = {{ flexDirection:'row', alignItems:'flex-start',flexWrap:'wrap',alignSelf:'flex-start'}}>
                  
                  { users.slice(0,shownListLength).map( item  =>  <MemberItem name={item.userName} uri={item.uri} onPress={()=> alert('navigate to profile')}/>) }
                  {/* check whether user is groupadmin */}
                  { user.isAdmin && (<RemoveUserButton onPress={()=>alert('remove user from a new page of user list')}/>) }
                </View>  
                <Button  style ={{flex:1}} title='SHOW ALL USERS' onPress={()=> alert('SHOW ALL USERS')}/>
              </View>
            ) : 
            (
              <View style={{flex:1}}> 
                <View style = {{ flexDirection:'row', alignItems:'flex-start',flexWrap:'wrap',alignSelf:'flex-start'}}>
                  { users.map( item  =>  <MemberItem name={item.userName} uri={item.uri} onPress={()=> alert('navigate to profile')}/>) }
                  {/* check whether user is groupadmin */}
                  { user.isAdmin && (<RemoveUserButton onPress={()=>alert('remove user from a new page of user list')}/>) }
                </View>  
              </View>
            )
          }
        <View style={{flex:1}}>
          <Text style={{  alignSelf:'flex-start', 
                        marginLeft: 16,
                        fontFamily:'Avenir-Light',
                        fontWeight:'bold',
                        fontSize:20 }}>
            Setting
          </Text>
          <SettingButton 
            title={'Group Name'}
            subTitle={'Not Set'}
            onPress= {()=> 
              {
                user.isAdmin ? alert('navigate to edit screen') : alert('you are not group owner');
              }
            }
          />
          <SettingButton 
            title={'Group Notice'}
            subTitle={'Not Set'}
            onPress= {()=> 
              {
                user.isAdmin ? alert('navigate to edit screen') : alert('you are not group owner');
              }
            }
          />
          
          {
            user.isAdmin ? 
            <Button title ='Delete this Group' onPress={() => alert('delete this group')}/>
              : <Button title ='Leave this Group' onPress={() => alert('leave this group')}/>
          }
        
        </View>
      </View>
    </SafeAreaView>
  );
}