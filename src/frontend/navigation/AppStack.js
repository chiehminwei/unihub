import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeAppTabNavigator';
import CreateGroupScreen from '~/screens/forum/CreateGroupScreen';
import CreateEventScreen from '~/screens/home/CreateEventScreen';
import CreateThreadScreen from '~/screens/forum/CreateThreadScreen';
import GroupInfo from '~/screens/forum/GroupInfo'
import { BackButton } from '../components/button/BackButton';
import ImageSelector from '../components/ImageSelector';
import ChooseLocationScreen from '~/screens/home/ChooseLocationScreen';
// import ChatDetailScreen from '~/screens/chat/ChatDetailScreen';


const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      <Stack.Screen 
        options={{ 
          headerShown:false
        }}
        name="Create" 
        component={CreateEventScreen} />    
      <Stack.Screen 
        options={{ 
          headerShown: false
        }} 
        name="ChooseLocation" 
        component={ChooseLocationScreen} />    
      <Stack.Screen 
      options={{ 
        headerLeft:() =>
          (
            <BackButton title={'Back'} />
          ),
        title:''
      }}
        name='CreateGroup' 
        component={CreateGroupScreen}/>
      <Stack.Screen options={{headerShown: false }} name='CreateThread' component={CreateThreadScreen}/>
      <Stack.Screen options={{headerShown: false }} name='ImageSelector' component={ImageSelector}/>
      <Stack.Screen 
        options={{ 
          headerLeft:() =>
            (
              <BackButton title={'Back'} />
            ),
          title:''
        }}
        name='GroupInfo' 
        component={GroupInfo}/>
      {/* <Stack.Screen options={{headerBackTitle: 'Back', title:''}}name='AllMemberList' component={AlllMemberlist}/> */}

      {/* <Stack.Screen options={{headerShown: false}} name='ChatExample' component={ChatDetailScreen}/> */}
    </Stack.Navigator>
  );
}

