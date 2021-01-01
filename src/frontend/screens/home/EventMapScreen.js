import React, { Component, useState, useRef, useEffect } from 'react';
import MapContent from '~/components/MapContent';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';

const EventMapScreen = (props) => {

	render() {
	  return (
	    <MapView
	      region={this.state.region}
	    />
	    <OverlayComponent
	      style={{position: 'absolute', bottom: 50}}
	    />
	  );
	}
}

export default EventMapScreen;