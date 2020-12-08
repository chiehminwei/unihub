import React, { useState } from "react";
import AppContainer from "~/navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Firebase, { FirebaseProvider } from "~/../firebase/config/Firebase";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { initializeApp } from "firebase";

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
//import screens
import HomeTab from './src/frontend/navigation/HomeAppTabNavigator'
import EventDetailScreen from '~/screens/home/EventDetailScreen';
import CreateGroupScreen from '~/screens/forum/CreateGroupScreen';
import ChatDetailScreen from "./src/frontend/screens/chat/ChatDetailScreen";


const fetchFont = () => {
  Font.loadAsync({
    'Avenir-Light':require('./assets/fonts/Avenir-Light.ttf'),
    'Avenir-Book':require('./assets/fonts/AvenirLTPro-Book.ttf'),
    'Avenir-Roman':require('./assets/fonts/AvenirLTPro-Roman.ttf'),
    'Avenir-Medium':require('./assets/fonts/Avenir-Medium.ttf'),
    'Avenir-Heavy':require('./assets/fonts/Avenir-Heavy.ttf'),
    'Avenir-Black':require('./assets/fonts/Avenir-Black.ttf')
  })
}

const RootStack = createStackNavigator();

function RootStackScreen() {
  return (
    <RootStack.Navigator initialRouteName="Home"
                        //  screenOptions={({route})=>{
                        //    return{
                        //       gestureEnabled: true,
                        //       cardOverlayEnabled: true,
                        //       ...TransitionPresets.ModalPresentationIOS,
                        //    }
                        //  }} 
                        
                         >
      <RootStack.Screen options={{headerShown: false}} name="HomeTab" component={HomeTab} />
      <RootStack.Screen navigationOptions={{mode:'modal'}} name="ChatExample" component={ChatDetailScreen} />
      <RootStack.Screen  
        name="CreateGroup" 
        component={CreateGroupScreen} 
        options={{
          headerShown: false,
        }}/>  
      <RootStack.Screen
        options={{
          headerShown: false,
        }}
        name="EventDetail" 
        component={EventDetailScreen} />    
    </RootStack.Navigator>
  );
}



export default function App() {
  const [fontLoaded, setFontLoaded]=useState(false)
if (!fontLoaded) {
  return (
    <AppLoading 
      startAsync={ fetchFont }
      onError = {()=>console.log('ERROR')}
      onFinish = {()=>{
      setFontLoaded(true)}}
      />
  )
}

  return (
    <FirebaseProvider value={Firebase}>
      <SafeAreaProvider>
        <PaperProvider> 
          <NavigationContainer>
            <AppContainer />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </FirebaseProvider>
  );
}
