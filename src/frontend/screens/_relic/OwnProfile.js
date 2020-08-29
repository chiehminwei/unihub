import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { withFirebaseHOC } from "../config/Firebase";

function OwnProfileScreen({ navigation, firebase }) {
  return (
    <View style={styles.container}>
      <Text>Own Profile Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withFirebaseHOC(OwnProfileScreen);