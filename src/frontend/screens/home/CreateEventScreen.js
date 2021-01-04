import React, { Component, useState, useRef, useEffect, useContext } from 'react';
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
  Animated,
} from 'react-native';
import { Image, ButtonGroup, Button } from 'react-native-elements';
import { List, Divider, FAB } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import CalendarTimePicker from '~/components/CalendarTimePicker';
import MapView, { Marker } from 'react-native-maps';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fumi } from 'react-native-textinput-effects';
import FumiPicker from '~/components/input/FumiPicker';
import Collapsible from 'react-native-collapsible';
import MultiLine from '~/components/input/MultiLine';
import BottomSheet from 'reanimated-bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenStyles } from '~/stylesheets/screenStyles';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { withFirebaseHOC } from "~/../firebase";
const uuidv4 = require('random-uuid-v4');
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/button/BackButton';
import { HeaderRightButton } from '../../components/button/HeaderRightButton';
import { AuthUserInfoContext } from '~/navigation/AuthUserProvider';
import { UserGroupsContext } from '~/navigation/UserGroupsProvider';


const CreateEventScreen = ({ route, firebase }) => {

  const screenWindow = Dimensions.get('window');
  const screenHeight = Math.round(screenWindow.height);
  const screenWidth = Math.round(screenWindow.width);

  // const setGoogleLocation = route.params
  const { userInfo } = useContext(AuthUserInfoContext);
  const userID = userInfo.uid;
  const navigation = useNavigation()

  // Calendar Time Picker
  const [startCollapsed, setStartCollapse] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endCollapsed, setEndCollapse] = useState(true);
  const [endDate, setEndDate] = useState(new Date());
  const handleToggle = (isCollapsed, position) => {
    if (position === 'start') {
      if (isCollapsed) {
        setStartCollapse(isCollapsed);
      }
      else {
        setStartCollapse(isCollapsed);
        setEndCollapse(true);
      }
    }
    else {
      if (isCollapsed) {
        setEndCollapse(isCollapsed);
      }
      else {
        setEndCollapse(isCollapsed);
        setStartCollapse(true);
      }
    }
  }

  // Event Type
  const eventTypes = ['In person', 'Online'];
  const [selectedIndex, setIndex] = useState(0);
  const updateEventType = (index) => {
    setIndex(index);
  };

  // Group Name
  const [ group, setGroup ] = useState({});
  const { groupName, groupID } = group;
  const { userGroups } = useContext(UserGroupsContext);
  const [pickerVisible, setPickerVisible] = useState(false);
  const togglePicker = () => {
    setPickerVisible(!pickerVisible);
  } 

  // Text Input
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');

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
  const EventNameInput = fumiInput({
      label: 'Event Name',
      iconName: 'event',
      iconClass: MaterialIcons,
      onChangeText: setEventName,
    }
  );
  const ContactInput = fumiInput({
      label: 'Contact Info',
      iconName: 'email',
      iconClass: MaterialCommunityIcons,
      onChangeText: setContact,
    }
  );

  // Location  
  const LocationInput = fumiInput({
      label: 'Add location',
      iconName: 'map-marker',
      iconClass: MaterialCommunityIcons,
      onChangeText: setLocation, 
    }
  );
  const OnlineLocationInput = fumiInput({
      label: 'Meeting URL',
      iconName: 'web',
      iconClass: MaterialCommunityIcons,
      onChangeText: setLocation,
    }
  );

  // Image
  const EMPTY_URI = 'data:img';
  const [uri, setURI] = useState('data:img'); 

  // Bottom sheet
  const [ sheetIsOpen, setSheetIsOpen ] = useState(false);
  const [ opacity, setOpacity ] = useState(new Animated.Value(0));
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
      <Divider style={{ height: 5 }}/>
      <List.Item
        onPress={onClose}
        title="Cancel"
        titleStyle={{ textAlign: 'center' }}
      />
    </View>
  );

  const renderBackDrop = () => (
    <Animated.View
      style={{
        opacity: opacity,
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <TouchableOpacity
        style={{
          width: screenWidth,
          height: screenHeight,
          backgroundColor: 'transparent',
        }}
        activeOpacity={1}
        onPress={onClose}
      />
    </Animated.View>
  );

  const onOpen = () => {
    setSheetIsOpen(true);
    sheetRef.current.snapTo(2);
    Animated.timing(opacity, {
      toValue: 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onClose = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    sheetRef.current.snapTo(0);
    setTimeout(() => {
      setSheetIsOpen(false);
    }, 50);
  };


  const takePhoto = async () => {
    onClose();
    await Permissions.askAsync(Permissions.CAMERA);
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [2, 3],
    });

    handleImagePicked(pickerResult);
  }

  const chooseFromAlbum = async () => {
    onClose();
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    navigation.navigate('ImageSelector', {numSelectedImage})
  }

  const handleImagePicked = pickerResult => {
    onClose();
    if (!pickerResult.cancelled) {
        setURI(pickerResult.uri);
    }
  };

  const deletePhoto = () => {
    sheetRef.current.snapTo(2);
    setURI(EMPTY_URI);
  }


  // Post
  const handlePost = async () => {
    // Upload image to Firebase Storage
    try {
      if (uri !== EMPTY_URI) {
        const uploadUrl = await uploadImageAsync(uri);
        setURI(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      let toast = Toast.show('Image upload failed.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      })
      return;
    } 
    
    // Push event to firestore
    const event = {
      eventName,
      description,
      tags: ['TAG1', 'TAG2'], // TODO
      location,  // TODO
      time: {
        startDate,
        endDate,
      },
      contact,
      eventType: eventTypes[selectedIndex],
      uri: uri,
      participants: [1, 2, 3],
      filters: [1, 2, 3],
      creator: userInfo,
      host: group,
    };
    try {
      const result = await firebase.createEvent(userID, groupID, event);
      navigation.navigate('EventDetail', { event });
      let toast = Toast.show('Event successfully posted.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
      });

      setTimeout(function () {
          Toast.hide(toast);
      }, 2000);
      
    } catch (error) {
      console.log(error);
      setPostError(error.message);      
      let toast = Toast.show('Event posting failed.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      })
    }

  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
  <SafeAreaView style={[screenStyles.safeArea,{alignItems:'stretch'}]} edges={['right','top','left']}>
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', marginBottom: 0}} behavior="padding" enabled   keyboardVerticalOffset={0}>
      <View style={styles.headerContainer}>
        <View style={{flex:1,}}>
          <BackButton title={'Back'} navigation={navigation}/>
        </View>
        <View style={{flex:1, alignItems:'flex-end'}}>
          <HeaderRightButton title='post' 
          // enabled= {isPostEnabled} 
          onPress={handlePost}/> 
        </View>
      </View>
      
      <ScrollView onScrollBeginDrag={dismissKeyboard} keyboardShouldPersistTaps="never" showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
         <TouchableOpacity onPress={onOpen}>
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
        <ButtonGroup
          selectedButtonStyle={{backgroundColor:'#bad4da', borderColor:'transparent'}}
          onPress={updateEventType}
          selectedIndex={selectedIndex}
          buttons={eventTypes}
          containerStyle={{height: 40, borderRadius:5}}
        />
        <FumiPicker
          pickerVisible={pickerVisible}
          togglePicker={togglePicker}
          value={groupName}
          editable={false}
          label="Host"
          iconClass={MaterialIcons}
          iconName="group"
          iconColor={'#f95a25'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
        />
        <Collapsible
          collapsed={!pickerVisible}
          duration={250}
        >
          <Picker
            selectedValue={groupName}
            onValueChange={(groupName, index) => {
              setGroup(userGroups[index]);
            }}>
            { userGroups.map(({groupID, groupName}, index) => <Picker.Item key={groupID} label={groupName} value={groupName} />) }
          </Picker>
        </Collapsible>
        { EventNameInput }
        <CalendarTimePicker
          isCollapsed={startCollapsed}
          setCollapse={(isCollapsed) => handleToggle(isCollapsed, 'start')}
          setParentDate={setStartDate}
        />
        <CalendarTimePicker
          isCollapsed={endCollapsed}
          setCollapse={(isCollapsed) => handleToggle(isCollapsed, 'end')}
          setParentDate={setEndDate}
        />
        <MultiLine
          value={description}
          maxLines={4}
          maxLength={280}
          onChangeText={setDescription}
          label="Description (use # for tags)"
          iconClass={MaterialIcons}
          iconName="description"
        />
        { ContactInput }
        { eventTypes[selectedIndex] === 'In person' ? LocationInput : OnlineLocationInput }
        <Button title='choose location' onPress={()=> navigation.navigate('ChooseLocation')}/>
        <Button  
          style={{ marginTop: 40, paddingBottom: 50, width:0.7*screenWidth, alignSelf:'center' }} 
          buttonStyle={{backgroundColor:'#bad4da',borderRadius:10}}
          titleStyle={{fontFamily:'Avenir-Light', fontSize: 18, fontWeight:'bold'}} 
          title="Post" 
          onPress={handlePost}
        />
       </ScrollView>

      { sheetIsOpen && renderBackDrop() }
        <BottomSheet
          ref={sheetRef}
          snapPoints={[
            '-10%',
            screenHeight * 0.15,
            screenHeight * 0.45
          ]}
          initialSnap={0}
          borderRadius={10}
          renderContent={renderBottomSheet}
          onCloseEnd={onClose}
          enabledInnerScrolling={false}
        />        
      
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}

export default withFirebaseHOC(CreateEventScreen);

const styles = StyleSheet.create({
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


