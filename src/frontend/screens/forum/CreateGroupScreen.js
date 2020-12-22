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
} from 'react-native';
import { FAB } from 'react-native-paper';
import { Image, ButtonGroup, Button } from 'react-native-elements';
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

const CreateGroupScreen = ({ firebase, navigation }) => {

  // const { user } = useContext(AuthUserContext);
  const userInfo = firebase.getCurrentUserInfo();
  
  // Group Type
  const groupTypes = ['Public', 'Private'];
  const [selectedIndex, setIndex] = useState(0);
  const updateGroupType = (index) => {
    setIndex(index);
  };


  // Group Name Input
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  

  const fumiInput = ({ label, iconName, iconClass, onChangeText }) => (
    <Fumi
      onChangeText={onChangeText}
      label={label}
      iconClass={iconClass}
      iconName={iconName}
      iconColor={'#f95a25'}
      iconSize={20}
      iconWidth={40}
      inputPadding={16}
    />
  );
  const GroupNameInput = fumiInput({
      label: 'Group Name',
      iconName: 'group',
      iconClass: MaterialIcons,
      onChangeText: setGroupName,
    }
  );



  // Image
  const screenHeight = Math.round(Dimensions.get('window').height)
  const [uri, setURI] = useState(EMPTY_URI); 
  const [snapPoints, setSnapPoints] = useState([0, 0.47*screenHeight, 0]);
  
  const sheetRef = useRef(null);
  const renderBottomSheet = () => (
    <View
      style={{
        backgroundColor: 'white',
        height: 0.47*screenHeight,
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
    setSnapPoints([0, 0.47*screenHeight, 0]);
  }

  const handleImagePicked = pickerResult => {
    if (!pickerResult.cancelled) {
        setURI(pickerResult.uri);
        setSnapPoints([0, 0.52*screenHeight, 0]);
    }
  };

  const handlePost = async () => {
    // Upload image to Firebase Storage
    let uploadUrl;
    if (uri !== EMPTY_URI) {
       uploadUrl = await uploadImageAsync(uri);
       setURI(uploadUrl);
    } 
    // Push group to firestore
    const group = {
      admin: userInfo,
      groupName,
      description,
      groupType: groupTypes[selectedIndex],
      uri: uploadUrl,
    };
    try {
      const result = await firebase.createGroup(group); // TODO: firebase (remember to check group name rights)      
      alert('Yay')
      console.log(group)
      // TODO: navigate to previous screen & send success notification
    } catch (e) {
      console.log(e);
      alert('Post failed, sorry :('); // TODO: change this to notification
    }

  }
  const screenWidth = Math.round(Dimensions.get('window').width)
  return (
    <SafeAreaView style={screenStyles.safeArea} edges={['right','top','left']}>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', marginBottom: 0}} behavior="padding" enabled   keyboardVerticalOffset={0}>
        <ScrollView keyboardShouldPersistTaps="never" style={{backgroundColor:'white'}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',

            }}
          >
          <TouchableOpacity onPress={() => sheetRef.current.snapTo(1)}>
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
              />
              </View> 
        </ScrollView>
        <FAB
          style={{ 
            position: 'absolute',
            margin: 16,
            left: 0,
            top: 10,
            backgroundColor:'white'
          }}
          small
          icon="arrow-left"
          onPress={() => navigation.goBack()}/>
        
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

export default withFirebaseHOC(CreateGroupScreen);

const styles = StyleSheet.create({
  // Shadow
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