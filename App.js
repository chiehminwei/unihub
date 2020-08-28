import React from "react";
import AppContainer from "./navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Firebase, { FirebaseProvider } from "./config/Firebase";


export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </FirebaseProvider>
  );
}
