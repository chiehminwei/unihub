import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Button, Alert, View, Text, ActivityIndicator, Image, Dimensions } from 'react-native';


const createTwoButtonAlert = (onPress, alert) =>
Alert.alert(
  alert,
  "",
  [
    { text: "OK", onPress: onPress },

    {
      text: "Cancel",
      // onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    }
  ],
  { cancelable: false }
);


export function TwoButtonAlert ({ title, onPress, alert }){
  return(
  <Button title={title} onPress={()=>createTwoButtonAlert(onPress, alert)}/>

  )
}