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
  Text,
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { Image, ButtonGroup, Button, Avatar } from 'react-native-elements';
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
import FumiMap from '~/components/input/FumiMap';


function findHashtags(searchText) {
  const regexp = /\B\#\w\w+\b/g
  return searchText.match(regexp);
}

const CreateEventScreen = ({ route, firebase }) => {

  const [isPostEnabled, setIsPostEnabled ] = useState(false);

  const screenWindow = Dimensions.get('window');
  const screenHeight = Math.round(screenWindow.height);
  const screenWidth = Math.round(screenWindow.width);

  // const setGoogleLocation = route.params
  const { userInfo } = useContext(AuthUserInfoContext);
  const userID = userInfo.uid;
  const { userGroups } = useContext(UserGroupsContext);

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

  // Group
  const groupPlaceHolder = {
    groupName: 'Choose a group here (required)',
    groupID: 'dummyID',
    uri: '',
  } 
  const [ group, setGroup ] = useState(groupPlaceHolder)
  const [ groups, setGroups ] = useState(userGroups);
  const isGroupChosenColor = (group.groupID === groupPlaceHolder.groupID) ? 'grey' : 'black';
  const [ showGroup, setShowGroup ] = useState(false)

  // Event
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(null);


  const [contact, setContact] = useState('');
  
  // useEffect(() => {
  //   console.log(HASHTAG_FORMATTER(description))
  //   // setTags(findHashtags(description));
  // }, [description]);

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
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState('Location');
  const [placeAddress, setPlaceAddress] = useState('')

  useEffect(() => {
    if (!placeName) {
      setPlaceName('Location');
    }
  }, [placeName])
  
  const iconColor = placeName !== 'Location' ? '#f95a25' : '#a3a3a3';

  const LocationInput = () => {
    return (
      <FumiMap
        label={placeName}
        iconClass={MaterialCommunityIcons}
        iconName={'map-marker'}
        iconColor={iconColor}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        onPress={() => navigation.navigate('ChooseLocation')}
      />
    )
  }

  const OnlineLocationInput = fumiInput({
      label: 'Meeting Link',
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

  // Handling location from route.params
  const isFocused = useIsFocused();  
  useEffect(() => {
    if (route.params && route.params.location) {
      const newLocation  = route.params.location;
      const { placeName, placeAddress } = route.params;
      setPlaceName(placeName);
      setPlaceAddress(placeAddress);
      setLocation(newLocation)
    }    
  }, [isFocused]);

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
      tags,
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
    console.log(event)
    return
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

  const renderChooseGroup = (
    <View style={styles.userInputContainer}>
      <Avatar size="small" key={group.groupID} rounded source={{uri:group.uri}} />
        <TouchableOpacity disabled={groups.length < 2} style={styles.userInputTouchable} onPress={ ()=> setShowGroup(!showGroup) }>
          <Text style={[styles.groupNameText,{ color: isGroupChosenColor }]}> {group.groupName} </Text>                
          { <MaterialIcons name="keyboard-arrow-right" size={24} color={isGroupChosenColor}/> }
        </TouchableOpacity>
    </View>
  )

  return (
  <SafeAreaView style={[screenStyles.safeArea,{alignItems:'stretch', backgroundColor:'white'}]} edges={['right','top','left']}>
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', marginBottom: 0}} behavior="padding" enabled   keyboardVerticalOffset={0}>
      <View style={styles.headerContainer}>
        <View style={{flex:1,}}>
          <BackButton title={'Back'} navigation={navigation}/>
        </View>
        <View style={{flex:1, alignItems:'flex-end'}}>
          <HeaderRightButton
            title='post' 
            enabled= {true} 
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
        { renderChooseGroup }
        
        { !showGroup ? (
            <View>
              { EventNameInput }
              <MultiLine
                height={screenHeight * 0.2}
                placeholder="Description (use # for tags)"
                iconColor={'#f95a25'}
                iconClass={MaterialIcons}
                iconName="description"
                setTags={setTags}
                setDescription={setDescription}
              />
              
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

              { ContactInput }
              { eventTypes[selectedIndex] === 'In person' ? LocationInput() : OnlineLocationInput }
            </View>
          ) : 
          <View>
            {
              groups.map(item => 
                <View key={item.groupID} style={styles.userInputContainer}>
                  <Avatar 
                    size="small" 
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


