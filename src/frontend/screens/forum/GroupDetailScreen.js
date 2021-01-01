import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Button, Alert, View, Text, ActivityIndicator, Image, Dimensions } from 'react-native';
import { withFirebaseHOC } from "~/../firebase";
import  PrivateScreen  from '~/screens/forum/PrivateScreen';
import  PublicScreen from './PublicScreen';
import ThreadList from '../../components/lists/ThreadList';
import { GroupContext } from '~/navigation/GroupProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// TODO pass username and profile uri to members


const deviceWidth = Dimensions.get('window').width;


function GroupContent({ isPrivate, members, isInGroup }){
  if (isPrivate) return <PrivateScreen members={members} isInGroup={isInGroup}/>
  return <PublicScreen members={members} isInGroup = {isInGroup}/>
} 


const GroupDetailScreen = ({ route, navigation, firebase }) => {




  const { group } = route.params;
  const { admin, description, groupID, groupName, groupType, uri, numMember, groupNotice } = group;
  const isPrivate = groupType === 'private';
  const userInfo = firebase.getCurrentUserInfo();
  const [ members, setMembers ] = useState([]);
  const [ isInGroup, setIsInGroup ] = useState(false);
  const [ isWaiting, setIsWaiting ] = useState(false);
  const [ groupPosts, setGroupPosts ] = useState([]);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => isInGroup ?  (
        <TouchableOpacity style={{marginRight:16}} onPress={() => navigation.navigate('GroupInfo', { contextGroupID })}>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
        </TouchableOpacity>
      ) : []
    });
  }, [navigation,isInGroup]);

  
  const { contextGroupID, setContextGroupID } = useContext(GroupContext);

  const joinGroup = () => {
    firebase.joinGroup(userInfo, groupID);
  }

  const acceptMyself = () => {
    firebase.acceptMember(userInfo.uid, groupID);
  }

  const JoinButton = (buttonStatus) => {
    if (buttonStatus  === 'IN_GROUP') {
      return;
    }
    else if (buttonStatus === 'IS_WAITING') {
      return (
        <TouchableOpacity
          style={{marginVertical:20, alignContent:"stretch"}}
          onPress={acceptMyself}
        >
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
              Request Sent
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity
          style={{marginVertical:20, alignContent:"stretch"}}
          onPress={joinGroup}
        >
          <View style={{backgroundColor:'#bad4da', 
                        width: deviceWidth*0.7,
                        alignItems:'center',
                        padding:10,
                        borderRadius:10}}>
            <Text style={{fontFamily:'Avenir-Light',
                          fontSize:18,
                          fontWeight:'600',
                          color:'white',
                          backgroundColor:'#bad4da'}}>
              Join Group
            </Text>
          </View>
        </TouchableOpacity>
    )

  }

  const getButtonStatus = () => {
    if (isWaiting) {
      return 'IS_WAITING';
    }
    else if (isInGroup) {
      return 'IN_GROUP';
    }
    else {
      return 'NOT_IN_GROUP';
    }
  }

  const buttonStatus = getButtonStatus();

  useEffect(() => {
      const memberUnsubscribe = firebase.getMembers(groupID, setMembers);
      const inGroupUnsubscribe = firebase.userIsInGroup(userInfo.uid, groupID, setIsInGroup);
      const isWaitingUnsubscribe = firebase.userIsWaiting(userInfo.uid, groupID, setIsWaiting);
      const groupPostsUnsubscribe = firebase.getGroupPosts(groupID, setGroupPosts);

      return () => {
        memberUnsubscribe();
        inGroupUnsubscribe();
        isWaitingUnsubscribe();
        groupPostsUnsubscribe();
      }
    }, []);

  useEffect(() => {
    setContextGroupID(groupID)
  }, [])

  const postThread = () => {
    navigation.navigate('CreateThread', { newgroup: group });
  }


  return (
    
      <ScrollView style={styles.scrollView}>
        <View style={{flex:1, alignContent:'stretch',alignItems:'center'}}>
          {/* group info */}
          <Image          
            source={{ uri }}
            style={ styles.image }
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={{marginTop:20}}>
            <Text style={styles.groupName}>
              { groupName }
            </Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.groupInfo}>
              { groupType } group · 
            </Text>
            { (numMember === 1) ?
              <Text style={styles.groupInfo}>{numMember} member</Text>
              :<Text style={styles.groupInfo}>{numMember} members</Text>
            }
          </View>
          

            {/* // TODO: deal with the situation when user is already in the group  */}
          {/* <TouchableOpacity style={{marginVertical:20, alignContent:"stretch"}} onPress={() => firebase.joinGroup(userInfo, groupID)}>
            <View style={styles.joinGroupButtonContainer}>
              <Text style={styles.joinGroupButtonTitle}>
                Join Group
              </Text>
            </View>
          </TouchableOpacity> */}

            { JoinButton(buttonStatus) }



            {/* about */}
            { !isInGroup && (
              <View style ={{ flex:1, alignSelf:'stretch' }}>
                <Text style={{alignSelf:'flex-start', 
                              marginTop: 20,
                              marginLeft:16,
                              // fontAlign: 'center', 
                              fontFamily:'Avenir-Light',
                              fontWeight:'bold',
                              fontSize:24 }}>
                  About
                </Text>
                <Text style={[styles.description,{marginHorizontal:16}]}>
                  { description }
                </Text>
              </View>
            )}

            { isInGroup && groupNotice && (
              <View>
                <Text style={{alignSelf:'flex-start', 
                              marginTop: 20,
                              marginLeft:16,
                              fontFamily:'Avenir-Light',
                              fontWeight:'bold',
                              fontSize:24 }}>
                  Group Notice
                </Text>
                <Text style={[styles.description,{marginHorizontal:16}]}>
                  { groupNotice }
                </Text>
              </View>
            )}


            {/* public or private */}
          <View style={{ flex:1, alignSelf:'flex-start'}}>
            <GroupContent isPrivate={isPrivate} members={members}/>
          </View>

          {/* Activities */}
             {/* !isPrivate  && (
            <View style={{flex:1, alignSelf:'stretch'}}>
              <Text style={styles.title}> Activities </Text>
              <View style = {styles.textInputPromptContainer}>
                <TouchableOpacity style={{flex:1}} onPress={() => alert('To profile') }>
                  <Image 
                    source={{uri: uri }} // TODO
                    style={styles.avator}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 4, marginLeft:5}} onPress= {postThread}>
                 { isInGroup &&
                  <Text style={styles.textInputPrompt}>
                    Hi Yufan, wanna share something?
                  </Text>
                  }
                </TouchableOpacity>
                
              </View>
              <ThreadList threads={groupPosts}/>
            </View>
             ) */}

             { isPrivate ? 
             (isInGroup ?  
            <View style={{flex:1, alignSelf:'stretch'}}>
              <Text style={styles.title}> Activities </Text>
              <View style = {styles.textInputPromptContainer}>
                <TouchableOpacity style={{flex:1}} onPress={() => alert('To profile') }>
                  <Image 
                    source={{uri: uri }} // TODO
                    style={styles.avator}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 4, marginLeft:5}} onPress= {postThread}>
                  <Text style={styles.textInputPrompt}>
                    Hi Yufan, wanna share something?
                  </Text>
                </TouchableOpacity>
                
              </View>
              <ThreadList threads={groupPosts}/>
            </View>
           : 
           <Text>This is a private group </Text>) 
           : 
           <View style={{flex:1, alignSelf:'stretch'}}>
              <Text style={styles.title}> Activities </Text>
              <View style = {styles.textInputPromptContainer}>
                <TouchableOpacity style={{flex:1}} onPress={() => alert('To profile') }>
                  <Image 
                    source={{uri: uri }} // TODO
                    style={styles.avator}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 4, marginLeft:5}} onPress= {postThread}>
                 { isInGroup &&
                  <Text style={styles.textInputPrompt}>
                    Hi Yufan, wanna share something?
                  </Text>
                  }
                </TouchableOpacity>
                
              </View>
              <ThreadList threads={groupPosts}/>
            </View> }
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

  avator:{
    borderWidth: 2,
    borderColor:'#bbdadf',
    borderRadius: 30,
    width: 50,
    height: 50,
    margin: 10
  },

  groupName: {
    textAlign:'center',
    fontFamily:'Avenir-Light',
    fontWeight:'bold',
    fontSize:24,
  },
  title: {
    alignSelf:'flex-start', 
    marginTop: 20,
    marginLeft:16,
    fontFamily:'Avenir-Light',
    fontWeight:'bold',
    fontSize:24 
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

  textInputPrompt:{
    fontFamily:'Avenir-Light',
    fontSize:18,
    color:'grey',
    marginTop:20,
    fontWeight:'600',
    textDecorationLine: 'underline',
  },

  textInputPromptContainer:{
    flex:1, 
    flexDirection: 'row', 
    alignItems:'center', 
    alignContent:'flex-start', 
    justifyContent:"flex-start", 
    backgroundColor:'#f1f7f8',
    padding: 5
  },
  
  joinGroupButtonContainer:{
    backgroundColor:'grey', 
    width: deviceWidth*0.7,
    alignItems:'center',
    padding:10,
    borderRadius:10
  },

  joinGroupButtonTitle:{
    fontFamily:'Avenir-Light',
    fontSize:18,
    fontWeight:'600',
    color:'white',
    backgroundColor:'grey'
  },
  
});