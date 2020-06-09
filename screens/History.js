import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";

function HistoryScreen({ navigation, firebase }) {

  function goToHistoryDetail() {
    navigation.navigate("HistoryDetail");
  }

  function goToSellerProfile() {
    navigation.navigate("SellerProfile");
  }

  return (
    <View style={styles.container}>
      <Text>History Screen!</Text>
      <Button
        title="Go to History Detail"
        onPress={goToHistoryDetail}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
      <Button
        title="Go to Seller Profile"
        onPress={goToSellerProfile}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
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

export default withFirebaseHOC(HistoryScreen);