import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeAppTabNavigator'

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
    </Stack.Navigator>
  );
}