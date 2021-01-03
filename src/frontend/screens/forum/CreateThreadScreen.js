import React, { Component, useState, useRef, useEffect, useContext } from 'react';
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  ImageBackground
} from 'react-native';
import { TextInput as NativeTextInput } from 'react-native';
import {  ButtonGroup, Button, Avatar } from 'react-native-elements';
import { List, Divider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { withFirebaseHOC } from "~/../firebase";
const uuidv4 = require('random-uuid-v4');
import Toast from 'react-native-root-toast';
import { AuthUserInfoContext } from '~/navigation/AuthUserProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles';
import { BackButton } from '../../components/button/BackButton';
import { HeaderRightButton } from '../../components/button/HeaderRightButton';
import { TextInput } from 'react-native-paper';
import { Video } from 'expo-av';


const screenHeight = Math.round(Dimensions.get('window').height)

const UserInput = (props) => {
  
  return (
    <TextInput
      // {...props}
      style={{height:props.height}}
      render={() => (
        <NativeTextInput
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          value={props.value}
          multiline={props.multiline}
          style={[
            {
              paddingTop: 8,
              paddingBottom: 8,
              paddingHorizontal:8,
              height: props.height,
              backgroundColor:'#f1f7f8',
              
            }   
          ]}
        />
      )}
    />
  );
};
  
const EMPTY_URI = 'data:img';
 
console.disableYellowBox = true;

function CreateThreadScreen ({ firebase, navigation, route }) {

  const isFocused = useIsFocused();
  const { userInfo } = useContext(AuthUserInfoContext);
  const { uid } = userInfo;
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const   { newgroup }   = route.params || [];
    if (!newgroup) {
      // Go to firebase and get available
      const unsubscribe = firebase.getUserGroups(uid, setGroups);
      return unsubscribe;
    }
    else {
      // setGroups([ newgroup ]);
      setGroup(newgroup)
      setIsShowGroupEnabled(false)
    }
  }, []);

  
  // const [uri, setURI] = useState(EMPTY_URI); 
  const [snapPoints, setSnapPoints] = useState([0, 0.45*screenHeight, 0]);
  
  const sheetRef = useRef(null);
  const renderBottomSheet = () => (
    <View
      style={{
        backgroundColor: 'white',
        height: 0.45*screenHeight,
      }}
    >
      <List.Item
        onPress={takePhoto}
        title="Take Photo"
        titleStyle={{ textAlign: 'center' }}
      />
      <Divider/>
      <List.Item
        onPress={chooseFromAlbum}
        title="Choose from Album"
        titleStyle={{ textAlign: 'center' }}
      />
      {/* {uri !== EMPTY_URI && (
        <List.Item
          onPress={deletePhoto}
          title="Delete Photo"
          titleStyle={{ textAlign: 'center', color: 'red' }}
        />)
      } */}
      <Divider style={{ height: 5 }}/>
      <List.Item
        onPress={() => sheetRef.current.snapTo(2)}
        title="Cancel"
        titleStyle={{ textAlign: 'center' }}
      />
    </View>
  );

  let fall = new Animated.Value(1)    
  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    })
    const AnimatedView = Animated.View;

    return (
      <AnimatedView
        pointerEvents="none"
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    )
  }

  const takePhoto = async () => {
    sheetRef.current.snapTo(2);
    await Permissions.askAsync(Permissions.CAMERA);
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [2, 3],
    });

    handleImagePicked(pickerResult);
  }

  const chooseFromAlbum = async () => {
    sheetRef.current.snapTo(2);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    navigation.navigate('ImageSelector', {numSelectedImage})

    // handleImagePicked(pickerResult);
  }

  const  deletePhoto =( uri ) => {
    // sheetRef.current.snapTo(2);
    const currentUri  = uri 
    const filteredAlluri = allUri.filter(item => item !== currentUri);
    const newPhotos = photos.filter( item => item.uri !== currentUri);
    route.params.photos = photos.filter( item => item.uri !== currentUri )
    setPhotos(newPhotos);
    setAllUri(filteredAlluri);
  }

  const handleImagePicked = pickerResult => {
    if (!pickerResult.cancelled) {
        // setURI(pickerResult.uri);
        setAllUri([...allUri, pickerResult.uri])
        setSnapPoints([0, 0.45*screenHeight, 0]);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  }

  const handlePost = async () => {
    // Upload images to Firebase Storage
    const imgs = [];
    const uploadImages = async () => {
      await asyncForEach(allUri, async uri => {
        const uploadUrl = await uploadImageAsync(uri);
        imgs.push(uploadUrl);
      })
    }
    await uploadImages();
    
    // Post to firestore
    const postContent = {
      creator: userInfo,
      post,
      title,
      group,
      imgs,
      numLikes: 0,
      numComments: 0,
    };
    try {
      const result = await firebase.addPost(uid, group.groupID, postContent);      
      navigation.navigate('GroupDetail', { group });
      let toast = Toast.show('Thread successfully posted.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
      });

      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      setTimeout(function () {
          Toast.hide(toast);
      }, 2000);

    } catch (e) {
      console.log(e);
      let toast = Toast.show('Network error.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
      });

      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      setTimeout(function () {
          Toast.hide(toast);
      }, 2000);
    }
  }


  // user input
  const [post, onChangePost] = useState('');
  const [title, onChangeTitle] = useState('');


  const groupPlaceHolder = {
    groupName: 'Choose a group here (required)',
    groupID: 'dummyID',
    uri: '',
  } 

  const [ isShowGroupEnabled, setIsShowGroupEnabled ] = useState(true)
  const [ showGroup, setShowGroup ] = useState(true)
  const [ group, setGroup ] = useState(groupPlaceHolder)
  const isGroupChosenColor = (group.groupName === groupPlaceHolder.groupName) ? 'grey' : 'black'
  const isPostEnabled = ( group.groupName !== 'Choose a group here (required)' && post !== '' && title !== '')

  
  const [allUri, setAllUri] = useState([])
  const numSelectedImage = allUri.length

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const  newPhotos  = route.params.photos || [];
    let newAllUri = [...allUri];      
    newPhotos.forEach(item =>{
      if (!newAllUri.includes(item.uri)) {
        newAllUri.push(item.uri);
      }
    })
    setPhotos(newPhotos);
    setAllUri(newAllUri);
  }, [isFocused]);

 
  return (
    
    <SafeAreaView style={[screenStyles.safeArea,{alignItems:'stretch', backgroundColor:'white'}]} edges={['right','top','left']}>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', marginBottom: 0}} behavior="padding"  enabled   keyboardVerticalOffset={0}>
        
        {/* header */}
        <View style={styles.headerContainer}>
          <View style={{flex:1,}}>
            <BackButton title={'Back'} navigation={navigation}/>
          </View>
          <View style={{flex:1, alignItems:'flex-end'}}>
            <HeaderRightButton title='post' enabled= {isPostEnabled} onPress={handlePost}/> 
          </View>
        </View>
        <View style={styles.userInputContainer}>
            <Avatar size="small" key={group.groupID} rounded source={{uri:group.uri}} />
              <TouchableOpacity style={styles.userInputTouchable} onPress={()=>{isShowGroupEnabled? setShowGroup(!showGroup): null ; setGroup(groupPlaceHolder)}}>
                <Text style={[styles.groupNameText,{ color: isGroupChosenColor }]}> {group.groupName} </Text>
                
                { isShowGroupEnabled ? <MaterialIcons name="keyboard-arrow-right" size={24} color={isGroupChosenColor}/> : null }
              </TouchableOpacity>
          </View>
          <Divider/>


        {/* body */}
        <ScrollView onScrollBeginDrag={dismissKeyboard} style={{backgroundColor:'white'}}>
          

          {/* choose a group */}
          <View
            style={{
              flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              
            }}
          >

          {/* choose group here  or user input here */}
        { showGroup ? 
          <View>
            <View style={{flex:1, marginVertical:10, marginHorizontal:16}}>
              <UserInput  
                value={title} 
                onChangeText={onChangeTitle}
                height={0.05 * screenHeight}
                placeholder={'Your Post Title'}
                multiline={false}/>

              <Divider style={{marginVertical:10}}/>
              <UserInput  
                value={post} 
                onChangeText={onChangePost}
                height={0.2 * screenHeight}
                placeholder={'Write Your Post Here...'}
                multiline={true}/>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft:12}}>


              {/* Choose Image */}
              <TouchableOpacity style ={styles.image} onPress={() => sheetRef.current.snapTo(1)}>
                  <View style={styles.imagePlaceHolder} > 
                    <MaterialIcons name="photo-size-select-actual" size={80} color="grey"/>
                  </View>   
              </TouchableOpacity>

              {/* image list */}
              { allUri !== undefined && (allUri.map( item =>  
                  <ImageBackground 
                    style={ styles.image }
                    imageStyle={{ width: 0.3*screenWidth, 
                      height: 0.3*screenWidth, 
                      maxHeight:0.3*screenWidth, 
                      borderRadius:15, 
                    }} 
                    source={item ? { uri: item } : null}>
                    <TouchableOpacity  style={{ margin: 4, width:30, height:30, backgroundColor:'#bad4da', borderRadius:10, alignItems:'center', justifyContent:'center'}}onPress={()=>deletePhoto(item)}>
                      <MaterialIcons name="close" size={24} color="white" />
                    </TouchableOpacity>
                  </ImageBackground>
                ))}  
            </ScrollView>
          </View>
          :
          <View>
            {
              groups.map(item => 
                <View style={styles.userInputContainer}>
                  <Avatar 
                    size="small" 
                    key={item.groupID} 
                    rounded source={item.uri ? {uri:item.uri} : null} 
                  />
                  <TouchableOpacity 
                    style={styles.userInputTouchable} 
                    onPress={()=>{setGroup(item),setShowGroup(!showGroup)}}
                  >
                    <Text style={styles.groupNameText}> 
                      {item.groupName}
                    </Text>  
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        }


      
      {/* <Video
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay={false}
        isLooping
        usePoster
        style={{ width: 300, height: 300 }}
      /> */}

          </View> 
        </ScrollView>
        
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          borderRadius={10}
          renderContent={renderBottomSheet}
          callbackNode={fall}
          enabledInnerScrolling={false}
        />
        { renderShadow() }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(CreateThreadScreen);

  const screenWidth = Math.round(Dimensions.get('window').width)
  const styles = StyleSheet.create({
    deleteButton:{
      alignItems:'center'
    },
    imagePlaceHolder:{
      justifyContent: 'center', 
      alignItems: 'center',
      width: screenWidth*0.3, 
      height: 0.3*screenWidth, 
      maxHeight:0.3*screenWidth, 
      backgroundColor: '#bdbdbd',
      borderRadius:15 
    },
    image:{
      width: 0.3*screenWidth, 
      height: 0.3*screenWidth, 
      maxHeight:0.3*screenWidth, 
      borderRadius:15, 
      margin: 4
    },

    userInputContainer:{
      flexDirection:"row",
      height:50,
      alignItems:'center',
      marginHorizontal:16
    },

    userInputTouchable:{
      flexDirection:'row'
    },

    groupNameText:{
      fontFamily:'Avenir-Light',
      fontSize: 16,
      fontWeight:'500',
      marginLeft:16
    },
    // Shadow
    headerContainer:{
      flexDirection:'row' , 
      // height: headerHeight, 
      backgroundColor:"white",
      height:60,
      alignItems:'center', 
      alignSelf:'stretch'
    },
    shadowContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#000',
    },
    container: {
      backgroundColor: 'transparent',
      position: 'relative',
      overflow: 'hidden',
    },
    placeholderContainer: {
      ...StyleSheet.absoluteFillObject,
    },
    placeholder: {
      backgroundColor: '#bdbdbd',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(uuidv4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }