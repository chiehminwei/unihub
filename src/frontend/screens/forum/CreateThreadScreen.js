import React, { Component, useState, useRef, useEffect, useContext } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Text,
  Image
} from 'react-native';
import { TextInput as NativeTextInput } from 'react-native';
import {  ButtonGroup, Button, Avatar } from 'react-native-elements';
import { List, Divider } from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';
import MultiLine from '~/components/input/MultiLine';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { withFirebaseHOC } from "~/../firebase";
const uuidv4 = require('random-uuid-v4');
import Toast from 'react-native-root-toast';
import { AuthUserContext } from '~/navigation/AuthUserProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles';
import { BackButton } from '../../components/button/BackButton';
import { PostButton } from '../../components/button/PostButton';
import { TextInput } from 'react-native-paper';
import { Video } from 'expo-av';
// import MultiImagePicker from '~/components/MultiImagePicker'






// dummy user data
const user =
  {
    userName: 'Eric Li',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu456',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  }


// dummy group data

const groups = [
  {
    hostName:'Jimmy',
    groupName: 'yyyyyoyoyo',
    numMembers: 10,
    availability: "Public",
    groupID: 'U123',
    description: 'long_text',
    groupUri:'https://picsum.photos/700',
  },
  {
    hostName:'Jimmy',
    groupName: 'ero niubi',
    numMembers: 10,
    availability: "Public",
    groupID: 'U234',
    description: 'long_text',
    groupUri:'https://picsum.photos/700',
  },
  {
    hostName:'Jimmy',
    groupName: 'Group THON 2020',
    numMembers: 10,
    availability: "Public",
    groupID: 'U345',
    description: 'long_text',
    groupUri:'https://picsum.photos/700',
  },
  {
    hostName:'Jimmy',
    groupName: 'xmas',
    numMembers: 10,
    availability: "Public",
    groupID: 'U456',
    description: 'long_text',
    groupUri:'https://picsum.photos/700',
  },
  {
    hostName:'Jimmy',
    groupName: 'gogoogogogo',
    numMembers: 10,
    availability: "Public",
    groupID: 'U567',
    description: 'long_text',
    groupUri:'https://picsum.photos/700',
  },

]
  
  


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
                backgroundColor:'#f1f7f8'
              }   
            ]}
          />
        )}
      />
    );
  };

  


  
const EMPTY_URI = 'data:img';

// Add a Toast on screen.
let toast = Toast.show('This is a message', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
});

// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
setTimeout(function () {
    Toast.hide(toast);
}, 500);
 

console.disableYellowBox = true;

function CreateThreadScreen ({ firebase, navigation }) {

  // const { user } = useContext(AuthUserContext);
  const userInfo = firebase.getCurrentUserInfo();



  // Image
  
  const [uri, setURI] = useState(EMPTY_URI); 
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
      {uri !== EMPTY_URI && (
        <List.Item
          onPress={deletePhoto}
          title="Delete Photo"
          titleStyle={{ textAlign: 'center', color: 'red' }}
        />)
      }
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
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 3],
    });

    handleImagePicked(pickerResult);
  }

  const deletePhoto = () => {
    sheetRef.current.snapTo(2);
    setURI(EMPTY_URI);
    setSnapPoints([0, 0.45*screenHeight, 0]);
  }

  const handleImagePicked = pickerResult => {
    if (!pickerResult.cancelled) {
        setURI(pickerResult.uri);
        setSnapPoints([0, 0.5*screenHeight, 0]);
    }
  };

  // const handlePost = async () => {
  //   // Upload image to Firebase Storage
  //   let uploadUrl;
  //   if (uri !== EMPTY_URI) {
  //      uploadUrl = await uploadImageAsync(uri);
  //      setURI(uploadUrl);
  //   } 
  //   // Push group to firestore
  //   const group = {
  //     admin: userInfo,
  //     groupName,
  //     description,
  //     groupType: groupTypes[selectedIndex],
  //     uri: uploadUrl,
  //   };
  //   try {
  //     const result = await firebase.createGroup(group); // TODO: firebase (remember to check group name rights)      
  //     alert('Yay')
  //     console.log(group)
  //     // TODO: navigate to previous screen & send success notification
  //   } catch (e) {
  //     console.log(e);
  //     alert('Post failed, sorry :('); // TODO: change this to notification
  //   }

  // }

  const screenWidth = Math.round(Dimensions.get('window').width)

  // const[photos, setPhotos] = useState([])
   
  // const componentDidUpdate = (props) => {
  //   const {params} = props.route;
  //   if (params) {
  //     const {photos} = params;
  //     if (photos) setPhotos({photos});
  //     delete params.photos;
  //   }
  // }

  // const renderImage =(item, i) =>{
  //   return (
  //     <Image
  //       style={{ height: 100, width: 100 }}
  //       source={{ uri: item.uri }}
  //       key={i}
  //     />
  //   )
  // }
  // const render = ()=> {
  //   const { navigate } = props.navigation;
  


  const {
    userName,
    numGroups,
    numFriends,
    userID,
    major,
   
    classyear,
  } = user 


  // user input

  const [post, onChangePost] = useState('');
  const [title, onChangeTitle] = useState('');


  const groupPlaceHolder = {
    groupName: 'Choose a group here (required)',
    groupID: 'dummyID',
    groupUri:'',
  }

  const [ showGroup, setShowGroup ] = useState(true)
  const [ group, setGroup ] = useState(groupPlaceHolder)
  const isGroupChosenColor = (group === groupPlaceHolder) ? 'grey' : 'black'
  const isPostEnabled = ( group !== groupPlaceHolder && post !== '' && title !== '')
  return (
    <SafeAreaView style={[screenStyles.safeArea,{alignItems:'stretch'}]} edges={['right','top','left']}>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', marginBottom: 0}} behavior="padding" enabled   keyboardVerticalOffset={0}>
        
        {/* header */}
        <View style={styles.headerContainer}>
          <View style={{flex:1,}}>
            <BackButton title={'Back'} navigation={navigation}/>
          </View>
          <View style={{flex:1, alignItems:'flex-end'}}>
            <PostButton enabled= {isPostEnabled} onPress={()=>alert('post~!!!!')}/> 
            {/* update onPress={handlePost} */}
          </View>
        </View>


        {/* body */}
        <ScrollView keyboardShouldPersistTaps="never" style={{backgroundColor:'white'}}>
          
          {/* choose a group */}
          <View
            style={{
              flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              padding:16,
            }}
          >
          <View style={styles.userInputContainer}>
            <Avatar size="small" key={group.groupID} rounded source={{uri:group.groupUri}} />
              <TouchableOpacity style={styles.userInputTouchable} onPress={()=>setShowGroup(!showGroup)}>
                <Text style={[styles.groupNameText,{ color: isGroupChosenColor }]}> {group.groupName} </Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color={isGroupChosenColor} />
              </TouchableOpacity>
          </View>
          <Divider/>

          {/* choose group here  or user input here */}
        { showGroup ? 
          <View>
            <View style={{flex:1, marginVertical:10}}>
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
            <TouchableOpacity style ={{width: screenWidth*0.3, height: 0.3*screenWidth, maxHeight:0.3*screenWidth, borderRadius:15}} onPress={() => sheetRef.current.snapTo(1)}>
              { uri === EMPTY_URI ? 
                <View style={{ justifyContent: 'center', alignItems: 'center',
                  width: screenWidth*0.3, height: 0.3*screenWidth, maxHeight:0.3*screenWidth, backgroundColor: '#bdbdbd',borderRadius:15 }} > 
                  <MaterialIcons name="photo-size-select-actual" size={80} color="grey"/>
                </View>
                : 
                  <Image              
                    source={{ uri }}
                    style={{ width: 0.3*screenWidth, height: 0.3*screenWidth, maxHeight:0.3*screenWidth, borderRadius:15 }}
                  />
              }
            </TouchableOpacity>
          </View>
          :
          <View>
            {
              groups.map(item => 
                <View style={styles.userInputContainer}>
                  <Avatar size="small" key={item.groupID} rounded source={{uri:item.groupUri}} />
                  <TouchableOpacity style={styles.userInputTouchable} onPress={()=>{setGroup(item),setShowGroup(!showGroup)}}>
                    <Text style={styles.groupNameText}> {item.groupName}</Text>  
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        }


      <Video
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay={false}
        isLooping
        usePoster
        style={{ width: 300, height: 300 }}
      />


          {/* <TouchableOpacity onPress={() => sheetRef.current.snapTo(1)}>
              { uri === EMPTY_URI ? 
                <View style={{ justifyContent: 'center', alignItems: 'center',
                  width: screenWidth, height: 300, maxHeight:300, backgroundColor: '#bdbdbd' }} > 
                  <MaterialIcons name="photo-size-select-actual" size={80} color="grey"/>
                </View>
                : <Image              
                    source={{ uri }}
                    style={{ width: screenWidth, height: 300, maxHeight:300 }}
                  />
              }
            </TouchableOpacity>
          </View>
          <View style={{paddingTop:30}}>
            <ButtonGroup 
              selectedButtonStyle={{backgroundColor:'#bad4da', borderColor:'transparent'}}
              onPress={updateGroupType}
              selectedIndex={selectedIndex}
              buttons={groupTypes}
              containerStyle={{height: 40, borderRadius:5}}
            />

            { GroupNameInput }

            <MultiLine
              value={description}
              maxLines={4}
              maxLength={280}
              onChangeText={setDescription}
              label="Description (use # for tags)"
              iconClass={MaterialIcons}
              iconName="description"
            />
            <Button 
              style={{ marginTop: 40, width:0.7*screenWidth, alignSelf:'center' }} 
              buttonStyle={{backgroundColor:'#bad4da',borderRadius:10}}
              titleStyle={{fontFamily:'Avenir-Light', fontSize: 18, fontWeight:'bold'}} 
              title="Create" 
              onPress={handlePost}
              /> */}
          </View> 
        </ScrollView>
        
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          borderRadius={10}
          renderContent={renderBottomSheet}
          callbackNode={fall}
          enabledInnerScrolling={true}
        />
        { renderShadow() }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(CreateThreadScreen);


  const styles = StyleSheet.create({
    userInputContainer:{
      flexDirection:"row",
      height:50,
      alignItems:'center'
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