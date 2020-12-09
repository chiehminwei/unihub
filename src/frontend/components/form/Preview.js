import React, { useState } from 'react';
import { ScrollView, StyleSheet, Platform, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { withFirebaseHOC } from "~/../firebase";
import { Text, Button, ButtonGroup, Input, Image, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = {};
const event = {
    authorName: 'Tim Wang',
    eventName: 'Thon club fundraising',
    groupName: 'Group THON 2020',
    tags: [ '#thon', '#FTK', '#fundraising'],
    numMessages: 10,
    numGoing: 10,
    location: 'Online',
    id: 'U123',
    date: 'Monday July 3',
    uri: 'https://picsum.photos/700',
    description: long_text,
};

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

  const { eventName, date, eventContact, eventLocation, eventDescription } = this.props.event;
  
  return (
    <ScrollView style={[styles.container, styles.step1]}>        
        <Text>{ eventName }</Text>
        <Text>{ eventDate }</Text>
        <Text>{ eventContact }</Text>
        <Text>{ eventLocation }</Text>
        <Text>{ eventDescription }</Text>
        
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


