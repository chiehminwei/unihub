import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Dimensions, Share } from 'react-native';
import { Button, Card, Title, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageCarousel from '~/components/lists/ImageCarousel'
import { CurrentTimeContext } from '~/navigation/CurrentTimeProvider';
import { AuthUserInfoContext } from '~/navigation/AuthUserProvider';
import { withFirebaseHOC } from "~/../firebase";
// import useNavigation from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const long_text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`

const share = (props) => {
  const { threadTitle, description, uri } = props;
  Share.share({
    // message: `${props.description}`,
    title: `Check out this event on UniHub - ${props.threadTitle}`,
    url: props.uri,
  });
};


function calculateTimeDifference(current, past) {
  if (!past) {
    return 'Just now';
  }

  const deltaSeconds = current.seconds - past.seconds;

  const secondsPerMin = 60;
  const secondsPerHour = 60 * secondsPerMin;
  const secondsPerDay = 24 * secondsPerHour;

  const daysAgo = Math.floor(deltaSeconds / secondsPerDay);
  const hoursAgo = Math.floor(deltaSeconds / secondsPerHour);
  const minsAgo = Math.floor(deltaSeconds / secondsPerMin);

  if (daysAgo > 0) {
    return (daysAgo > 1) ? `${daysAgo} days ago` : `${daysAgo} day ago`;
  }
  else if (hoursAgo > 0) {
    return (hoursAgo > 1) ? `${hoursAgo} hours ago` : `${hoursAgo} hour ago`;
  }
  else {
    if (minsAgo < 1) {
      return 'Just now';
    }
    return (minsAgo > 1) ? `${minsAgo} mins ago` : `${minsAgo} min ago`;
  }
}


function ThreadItem ({ thread, firebase })  {
  const navigation = useNavigation()
  const { 
    postID,
    creator,
    post,
    title,
    group,
    imgs,
    numLikes,
    numComments,
    timestamp,
    timestampStr,
  } = thread;

  const { userInfo } = useContext(AuthUserInfoContext);
  const userID = userInfo.uid;

  const { currentTime } = useContext(CurrentTimeContext);
  const timeDifference = calculateTimeDifference(currentTime, timestamp);
  
  const { displayName, photoURL } = creator;
  const { groupName, uri, groupID } = group;

  const [ hasLiked, setHasLiked ] = useState(false);
  useEffect(() => {
    const unsubscribe = firebase.checkHasLiked(userID, postID, setHasLiked);
    return unsubscribe;
  }, []);

  const likePost = () => {
    firebase.likePost(userID, groupID, postID);
  }

  const unlikePost = () => {
    firebase.unlikePost(userID, groupID, postID);
  }

  return(
  <Card style={{ width:screenWidth, marginVertical:5, flex:1 ,}}  >
  <Card.Content style={{paddingHorizontal:0}}>
    <TouchableOpacity onPress={ () => navigation.navigate('ThreadDetail',{thread, timeDifference})}>
    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12 }}>
      <Image  source={{uri: photoURL }}
                style={{width: 50, height: 50, borderRadius: 25}} />
      <View style={{flex:1, marginLeft: 12}}>
        <View style={{ flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text style={{ fontFamily:'Avenir-Book', fontWeight:'800', color: 'black' }}> { displayName }</Text>
          </TouchableOpacity>
            
          <Text style={{ fontFamily:'Avenir-Book', color:'black'}}> in </Text>   

          <TouchableOpacity>
            <Text style={{ fontFamily:'Avenir-Book', fontWeight:'800', color:'black'}}>{ groupName }</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text> {timeDifference} </Text>
        </View>
      </View>
      <Text style={{ textTransform: 'uppercase', fontSize: 10, marginRight:16 }}>
        { timestampStr } 
      </Text>
    </View>
      <View style={{ flex: 1, marginTop:10, flexDirection: 'column', justifyContent: 'space-between'}}>
        <View>
          <Title style={{margin:10, fontFamily:'Avenir-Book'}}>{ title }</Title>
          <Text style={{margin:10, fontFamily:'Avenir-Book'}}>{ post }</Text>
        </View>
      </View>
      </TouchableOpacity>
      { ( imgs.length === 0 ) ? null: (imgs.length === 1) ? 
        <Image  source={{uri: imgs[0] }}
        style={{ width: screenWidth, height: screenWidth}} />
        :
        <ImageCarousel uris={thread.imgs}/>
      }
      
       
  </Card.Content>
  <Divider/>
  <Card.Actions style={{ flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
    <Button onPress={hasLiked ? unlikePost : likePost} icon="thumb-up"
            color={hasLiked ? 'green' : 'grey'}>
      { numLikes }
    </Button>
    <Button onPress={ () => navigation.navigate('ThreadDetail', {thread, timeDifference}) } icon="message-processing" color='grey'>{ numComments }</Button>
    <Button onPress={ () => share(thread) } icon="share" color='grey'></Button>
  </Card.Actions>
</Card>
)
};

export default withFirebaseHOC(ThreadItem);