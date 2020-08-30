import React, { useState } from 'react';
import { ScrollView, StyleSheet, Platform, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { withFirebaseHOC } from "~/../firebase/config/Firebase";
import { Text, Button, ButtonGroup, Input, Image, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = {};

const BasicInfo = (props) => {
  const [ date, setDate ] = useState(new Date(1598051730000));
  const [ mode, setMode ] = useState('datetime');
  const [ show, setShow ] = useState(false);
  const [ totalSteps, setTotalSteps ] = useState(props.getTotalSteps());
  const [ currentStep, setCurrentStep ] = useState(props.getCurrentStep());
  const [ text, setText ] = useState('');
  const [ eventTypeIndex, setEventTypeIndex ] = useState(0);
  const eventTypes = ['In person', 'Online'];

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
  
  // Date picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDateTimepicker = () => {
    showMode('datetime');
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <ScrollView style={[styles.container, styles.step1]}>
        <Image
          style={{ width: 300, height: 300 }}
        />
        <Text>Upload Poster (Optional)</Text>
        <ButtonGroup
          onPress={index => setEventTypeIndex(index)}
          selectedIndex={eventTypeIndex}
          buttons={eventTypes}
          containerStyle={{height: 50}}
        />
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          placeholder={"Event Name"}
        />
        <Input
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
          placeholder={"Contact Info"}
        />
        <Button onPress={showDateTimepicker} title="Time" />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Icon
          size={70}
          type='entypo'
          name='arrow-with-circle-right'
          onPress={nextStep}
          style={styles.btnStyle}
        />
      </ScrollView>
  );
};

export default withFirebaseHOC(BasicInfo);


