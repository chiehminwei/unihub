import React, { useState } from 'react';
import { ScrollView, StyleSheet, Platform, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { withFirebaseHOC } from "~/../firebase/config/Firebase";
import { Text, Button, ButtonGroup, Input, Image, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView from '~/components/MapView';


const styles = {};

const BasicInfo = (props) => {
  const [ totalSteps, setTotalSteps ] = useState(props.getTotalSteps());
  const [ currentStep, setCurrentStep ] = useState(props.getCurrentStep());
  const [ text, setText ] = useState('');
  
  const nextStep = () => {
    const { next, saveState } = props;
    // Save state for use in other steps
    saveState({ name: "samad" });
    // Go to next step
    next();
  };

  const goBack = () => {
    const { back } = props;
    // Go to previous step
    back();
  }
  
  return (
    <ScrollView style={[styles.container, styles.step1]}>        
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          placeholder={"Description #tag"}
        />
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          placeholder={"Location"}
        />
        <MapView/>
        
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Icon
            size={70}
            type='entypo'
            name='arrow-with-circle-left'
            onPress={goBack}
            style={styles.btnStyle}
          />
          <Icon
            size={70}
            type='entypo'
            name='arrow-with-circle-right'
            onPress={nextStep}
            style={styles.btnStyle}
          />
        </View>
      </ScrollView>
  );
};

export default withFirebaseHOC(BasicInfo);


