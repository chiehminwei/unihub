import React from 'react';
import { View, Animated, TouchableOpacity, StyleSheet, Text } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  CommentScreen  from '~/screens/home/CommentScreen';
import  ParticipantScreen  from '~/screens/home/ParticipantScreen';



function EventTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ paddingBottom: 10, flexDirection: 'row',backgroundColor:"#bad4da", height:40, justifyContent:"center", alignItems:"center" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View style={isFocused ? styles.tabfocused : styles.tabnotfocused}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Text style={{ 
                color: isFocused ? 'black' : 'grey' ,
                fontWeight: isFocused? 'bold' : '200',
                marginTop:5,
                fontFamily:'Avenir-Light'}}>
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
const styles=StyleSheet.create({
  tabfocused:{
    flex:1, 
    alignContent:'center', 
    alignItems: 'center', 
    backgroundColor: 'transparent',
  },
  tabnotfocused:{
    flex:1, 
    alignContent:'center', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  }


})
const EventTab = createMaterialTopTabNavigator();

export default function EventTabNavigator() {

  
    return (
      <EventTab.Navigator
        tabBarOptions={{
          style:{
            backgroundColor:'white'
            },
          labelStyle:{
            fontFamily:'Avenir-Light'
            },
          indicatorStyle: {
            orderBottomColor: '#00889A',
            borderBottomWidth: 1
            },
          }}
          tabBar={ props => <EventTabBar {...props}/>}
          >
          
        <EventTab.Screen name="Comments" component={CommentScreen} />
        <EventTab.Screen name="Participants" component={ParticipantScreen} />
      </EventTab.Navigator>
    );
  }

