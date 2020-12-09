import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventCardScreen from '../screens/profile/EventCardScreen';
import ThreadCardScreen from '../screens/profile/ThreadCardScreen';

function ProfileTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ paddingTop: 10, flexDirection: 'row',backgroundColor:'#bad4da', height:50, justifyContent:"center", alignItems:"center" }}>
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
            <View style={{
                  position: 'absolute',
                  bottom: 0,
                  height: 10,
                  width: isFocused ? 0 : 207,
                  marginBottom: -10,
                  backgroundColor: 'black',
                  alignSelf: 'center',
                  shadowColor: 'grey',
                  shadowOffset: {
                    width: 0,
                    height: 1
                  },
                  shadowRadius: 5,
                  shadowOpacity: 1,

                  elevation : isFocused ? 0 : 20
              }} />
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
                marginTop:10,
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
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowOffset:{ height: -1, width: 0},
    shadowColor:'grey',
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 20
    
  },
  tabnotfocused:{
    flex:1, 
    alignContent:'center', 
    alignItems: 'center', 
    backgroundColor: 'transparent', 

  }


})

const ProfileTab = createMaterialTopTabNavigator();

export function ProfileTabNavigator() {

  
    return (
      <ProfileTab.Navigator 
        tabBar={ props => <ProfileTabBar {...props}/>}
        >
        <ProfileTab.Screen options={{ headerShown: false }} name="Events" component={EventCardScreen} />
        <ProfileTab.Screen options={{ headerShown: false }} name="Forums" component={ThreadCardScreen} />
      </ProfileTab.Navigator>
    );
  }

  