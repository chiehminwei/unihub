import React from 'react';
import { View, TouchableOpacity,StyleSheet,Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NaviButton } from '~/components/button/NaviButton';
import { Text, Image } from 'react-native-elements';
//********* User Name Update*************/
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
  }
function NumDisplay({number,title, onPress}){
  return(
  <TouchableOpacity style={{flex:1, alignContent:'space-between', marginHorizontal:10, alignItems:'center'}} onPress={onPress}>
      <Text style={{fontSize: 20}}>{number}</Text>
      <Text style={{fontWeight:'bold'}}>{title}</Text>
  </TouchableOpacity>
  )
}   

function ProfileScreenHeader() {
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
  } = user;
  const navigation = useNavigation();
  
  return (
    <View 
      style={{ 
          flex: 1,
          backgroundColor: '#F3F3F3', 
          alignSelf: 'stretch', 
          alignContent:'flex-start',
      }}
    >
      <View style={{flex:1, alignContent:'flex-start' , alignItems:'flex-start'}}>
        <Text style={styles.name} >{userName}</Text> 
      </View>
      <View style={{flexDirection:'row',flex:1,alignItems:'center',marginLeft:10, marginBottom:10, padding:10, alignContent:'space-between'}}>
        <Image source={{ uri }}
               style={{flex:1, width: 50, height: 50}}
               containerStyle={{flex:1,width:50,height:50}} />
        <NumDisplay number={numPosts} title='Posts' onPress={()=>navigation.navigate('ThreadCard')}/> 
        <NumDisplay number={numFriends} title='Friends' onPress={()=>alert('Friends list')}/> 
        <NumDisplay number={numGroups} title='Groups' onPress={()=>navigation.navigate('GroupScreen')}/> 
      </View>
      <View style={{flex:2,marginHorizontal:10, padding:0 }}>
        <Text>
          {bio}{'\n'}
          contact me at{' '}
          {contact}{'\n'}
          interested in {interests[0]},{' '}{interests[1]}, and {interests[2]}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} 
                        onPress={()=>alert('edite profile')}>
      <Text style={styles.buttonTitle}>edit profile</Text>
      </TouchableOpacity> 
    </View>
  );
}
export default ProfileScreenHeader;

 const styles=StyleSheet.create({
    name:{
      color: '#121212',
      fontSize: 18,
      marginLeft: 15,
      textAlign: 'left'
    },
    button:{
      alignItems:'center',
      backgroundColor:'white',
      marginHorizontal: '30%',
      marginVertical:'1%', 
      padding: 5, 
      borderRadius: 5,
      shadowColor: 'rgba(0,0,0, .4)', 
      shadowOffset: { height: 1, width: 1 }, 
      shadowOpacity: 1, 
      shadowRadius: 1,
    },
    buttonTitle:{
      fontSize:16,
    },
 })