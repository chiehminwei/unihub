import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { withFirebaseHOC } from "../config/Firebase";

function SellerProfileScreen({ navigation, firebase }) {
  return (
    <View style={styles.container}>
      <Text>Seller Profile!</Text>
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

export default withFirebaseHOC(SellerProfileScreen);