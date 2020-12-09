import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeAppTabNavigator';
import CreateGroupScreen from '~/screens/forum/CreateGroupScreen';
import CreateEventScreen from '~/screens/home/CreateEventScreen';


const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      <Stack.Screen name="Create" component={CreateEventScreen} />      
      <Stack.Screen options={{headerShown: false}} name='CreateGroup' component={CreateGroupScreen}/>
    </Stack.Navigator>
  );
}