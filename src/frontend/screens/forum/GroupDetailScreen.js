import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, ActivityIndicator, Image, Dimensions } from 'react-native';
import { withFirebaseHOC } from "~/../firebase";
import  PrivateScreen  from '~/screens/forum/PrivateScreen';
import  PublicScreen from './PublicScreen';
import ThreadList from '../../components/lists/ThreadList';


const deviceWidth = Dimensions.get('window').width;


function GroupContent({isPrivate}){
  if (isPrivate) return <PrivateScreen/>
  return <PublicScreen/>
}  

const GroupDetailScreen = ({ route, navigation, firebase }) => {
  const { group } = route.params;
  const { admin, description, groupID, groupName, groupType, uri, numMember } = group;
  const isPrivate = groupType === 'private';
  const userInfo = firebase.getCurrentUserInfo();

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
              { groupType } group · {numMember } members
            </Text>
          </View>

            {/* // TODO: deal with the situation when user is already in the group  */}
          <TouchableOpacity style={{marginVertical:20, alignContent:"stretch"}} onPress={() => firebase.joinGroup(userInfo, groupID)}>
            <View style={styles.joinGroupButtonContainer}>
              <Text style={styles.joinGroupButtonTitle}>
                Join Group
              </Text>
            </View>
          </TouchableOpacity>



            {/* about */}
            <Text style={styles.title}> About </Text>
            <Text style={[styles.description,{marginHorizontal:16}]}>
              { description }
            </Text>

          

            {/* public or private */}
          <View style={{ flex:1, alignSelf:'flex-start'}}>
            <GroupContent isPrivate={isPrivate}/>
          </View>

            {/* Activities */
             !isPrivate && (
            <View style={{flex:1, alignSelf:'stretch'}}>
              <Text style={styles.title}> Activities </Text>
              <View style = {styles.textInputPromptContainer}>
                <TouchableOpacity style={{flex:1}} onPress={() => alert('To profile') }>
                  <Image 
                    source={{uri: uri }} // TODO
                    style={styles.avator}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 4, marginLeft:5}} onPress= {() => alert('to create thread within current group')}>
                  <Text style={styles.textInputPrompt}>
                    Hi Yufan, wanna share something?
                  </Text>
                </TouchableOpacity>
                
              </View>
              <ThreadList/>
            </View>
             )}
            
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