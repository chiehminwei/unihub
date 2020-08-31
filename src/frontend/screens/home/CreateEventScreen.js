import React, { Component, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
// import { Text, Button, ListItem } from 'react-native-elements';
// import { List } from 'react-native-paper';
import CalendarTimePicker from '~/components/CalendarTimePicker';
import MapView, { Marker } from 'react-native-maps';


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
   
  return (
      <KeyboardAvoidingView>
        <CalendarTimePicker
          isCollapsed={startCollapsed}
          setCollapse={(isCollapsed) => handleToggle(isCollapsed, 'start')}
        />
        <CalendarTimePicker
          isCollapsed={endCollapsed}
           setCollapse={(isCollapsed) => handleToggle(isCollapsed, 'end')}
        />
      </KeyboardAvoidingView>
  );
}

export default CreateEventScreen;