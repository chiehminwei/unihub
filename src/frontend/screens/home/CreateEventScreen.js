import React, { Component, useState, useRef, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions
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
import Animated from 'react-native-reanimated'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { withFirebaseHOC } from "~/../firebase";
const uuidv4 = require('random-uuid-v4');
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/button/BackButton';
import { HeaderRightButton } from '../../components/button/HeaderRightButton';


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






const CreateEventScreen = (props, { route, firebase }) => {
  // const setGoogleLocation = route.params
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
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [pickerVisible, setPickerVisible] = useState(false);
  const togglePicker = () => {
    setPickerVisible(!pickerVisible);
  } 
  useEffect(() => {
    const eligibleGroups = ['', 'Group A', 'Group B']; // TODO: check firebase for groups which current user has access to post
    setGroups(eligibleGroups);
  }, []);

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
      // onChangeText: setLocation, 
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
  const screenHeight = Math.round(Dimensions.get('window').height)
  const [uri, setURI] = useState('data:img'); 
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
    try {
       const uploadUrl = await uploadImageAsync(uri);
       setURI(uploadUrl);
    } catch (e) {
      console.log(e);
      let toast = Toast.show('Please make sure you have access to the internet :(', {
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
      content: {
        name: eventName,
        description,
        tags: ['TAG1', 'TAG2'], // TODO
        location: 'LOCATION',  // TODO
        time: {
          startDate,
          endDate,
        },
        contact,
        eventType: eventTypes[selectedIndex],
        uri: uri,
        participants: [1, 2, 3],
        filters: [1, 2, 3],
      },
      creator: firebase.getCurrentUserInfo(),
      host: {
        uid: 'group_uid',
        name: groupName,
        avatar_uri: 'ASDASD',
      },
    };
    try {
      // TODO: firebase (remember to check group name rights)            
      const result = await firebase.createEvent(event);
      
      // TODO: navigate to event screen & send success notification
      
    } catch (error) {
      console.log(error);
      setPostError(error.message);      
      let toast = Toast.show('Please make sure you have access to the internet :(', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      })
      return;
    }

  }
  const screenWidth = Math.round(Dimensions.get('window').width)
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
      
      <ScrollView keyboardShouldPersistTaps="never" showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
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
            onValueChange={(itemValue, itemIndex) => {
              setGroupName(itemValue);
            }}>
            { groups.map(name => <Picker.Item key={name} label={name} value={name} />) }
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


