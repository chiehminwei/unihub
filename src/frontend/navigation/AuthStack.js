import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '~/screens/login/WelcomeScreen';
import RegisterScreen from '~/screens/login/RegisterScreen';
import LoginScreen from '~/screens/login/LoginScreen';
import ForgotPasswordScreen from '~/screens/login/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="none">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <HomeStack.Screen name="Create" component={CreateEventScreen} />      
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}