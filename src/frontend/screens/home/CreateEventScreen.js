import React, { Component, useState, useRef, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Image, ButtonGroup, Button } from 'react-native-elements';
import { List, Divider } from 'react-native-paper';
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
import Animated from 'react-native-reanimated'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { withFirebaseHOC } from "~/../firebase";
const uuidv4 = require('random-uuid-v4');
import Toast from 'react-native-root-toast';


// // Add a Toast on screen.
// let toast = Toast.show('This is a message', {
//     duration: Toast.durations.LONG,
//     position: Toast.positions.BOTTOM,
//     shadow: true,
//     animation: true,
//     hideOnPress: true,
//     delay: 0,
//     onShow: () => {
//         // calls on toast\`s appear animation start
//     },
//     onShown: () => {
//         // calls on toast\`s appear animation end.
//     },
//     onHide: () => {
//         // calls on toast\`s hide animation start.
//     },
//     onHidden: () => {
//         // calls on toast\`s hide animation end.
//     }
// });

// // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
// setTimeout(function () {
//     Toast.hide(toast);
// }, 500);


console.disableYellowBox = true;

const CreateEventScreen = ({ navigation, firebase }) => {

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
  const [uri, setURI] = useState(''); 
  const [snapPoints, setSnapPoints] = useState([280, 280, 0]);
  
  const sheetRef = useRef(null);
  const renderBottomSheet = () => (
    <View
      style={{
        backgroundColor: 'white',
        height: 200,
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
      {uri !== '' && (
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
    setURI('');
    setSnapPoints([280, 280, 0]);
  }

  const handleImagePicked = pickerResult => {
    if (!pickerResult.cancelled) {
        setURI(pickerResult.uri);
        setSnapPoints([315, 315, 0]);
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
      creator: {
        uid: 'abc',
        name: 'Jimmy Wei',
        avatar_uri: 'ASDASD',
      },
      group: {
        uid: 'group_uid',
        name: groupName,
        avatar_uri: 'ASDASD',
      },
    };
    try {
      // TODO: firebase (remember to check group name rights)            
      const result = await firebase.createEvent(event);
      
      // TODO: navigate to event screen & send success notification
      
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

  }
   
  return (
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
      <ScrollView keyboardShouldPersistTaps="never">
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
         <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
            <Image              
              source={{ uri }}
              style={{ width: 200, height: 300 }}
              PlaceholderContent={<AntIcon name="plus" size={40} />}
            />
          </TouchableOpacity>
        </View>
        <ButtonGroup
          onPress={updateEventType}
          selectedIndex={selectedIndex}
          buttons={eventTypes}
          containerStyle={{height: 60}}
        />
        <FumiPicker
          pickerVisible={pickerVisible}
          togglePicker={togglePicker}
          value={groupName}
          editable={false}
          label="Group"
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
        <Button style={{ marginTop: 40 }} title="Post" onPress={handlePost}/>
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
  );
}

export default withFirebaseHOC(CreateEventScreen);

const styles = StyleSheet.create({
  // Shadow
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