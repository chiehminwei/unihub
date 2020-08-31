import React, { Component, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { Image, ButtonGroup, Button, Divider } from 'react-native-elements';
import CalendarTimePicker from '~/components/CalendarTimePicker';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Fumi } from 'react-native-textinput-effects';
import MultiLine from '~/components/input/MultiLine';

//     eventName: 'Thon club fundraising',
//     groupName: 'Group THON 2020',
//     tags: [ '#thon', '#FTK', '#fundraising'],
//     numMessages: 10,
//     numGoing: 10,
//     eventLocation: 'Online',
//     eventID: 'U123',
//     eventDate: 'Monday July 3',

const fumiInput = ({ label, iconName, iconClass }) => (
  <Fumi
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
  }
);

const ContactInput = fumiInput({
    label: 'Contact Info',
    iconName: 'email',
    iconClass: MaterialCommunityIcons,
  }
);

const LocationInput = fumiInput({
    label: 'Add location',
    iconName: 'map-marker',
    iconClass: MaterialCommunityIcons,
  }
);

const OnlineLocationInput = fumiInput({
    label: 'Meeting URL',
    iconName: 'web',
    iconClass: MaterialCommunityIcons,
  }
);

const CreateEventScreen = (props) => {  
  const [startCollapsed, setStartCollapse] = useState(true);
  const [endCollapsed, setEndCollapse] = useState(true);

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

  const eventTypes = ['In person', 'Online'];
  const [selectedIndex, setIndex] = useState(0);
  const updateEventType = (index) => {
    setIndex(index);
  };

  const [description, setDescription] = useState('');
   
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
          <Image
            source={{ uri: 'https://picsum.photos/700' }}
            style={{ width: 200, height: 300 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <ButtonGroup
          onPress={updateEventType}
          selectedIndex={selectedIndex}
          buttons={eventTypes}
          containerStyle={{height: 60}}
        />
        { EventNameInput }
        <CalendarTimePicker
          isCollapsed={startCollapsed}
          setCollapse={(isCollapsed) => handleToggle(isCollapsed, 'start')}
        />
        <CalendarTimePicker
          isCollapsed={endCollapsed}
          setCollapse={(isCollapsed) => handleToggle(isCollapsed, 'end')}
        />
        <MultiLine
          value={description}
          maxLines={4}
          maxLength={280}
          onChangeText={setDescription}
          label="Description"
          iconClass={MaterialIcons}
          iconName="description"
        />
        { ContactInput }
        { eventTypes[selectedIndex] === 'In person' ? LocationInput : OnlineLocationInput }
        <Button style={{ marginTop: 40 }} title="Post"/>
       </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CreateEventScreen;