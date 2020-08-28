import React from "react";
import AppContainer from "./navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Firebase, { FirebaseProvider } from "./config/Firebase";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
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
