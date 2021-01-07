import React, { useState } from "react";
import AppContainer from "~/navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Firebase, { FirebaseProvider } from "~/../firebase";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


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
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#bad4da',
    accent: '#bad4da',
  },
};
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
        <PaperProvider theme={theme}> 
          <AppContainer />
        </PaperProvider>
      </SafeAreaProvider>
    </FirebaseProvider>
  );
}
