import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";

function Home({ navigation, firebase }) {
  async function handleSignout() {
    try {
      await firebase.signOut();
      navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  }

  function goToItemDetail() {
    navigation.navigate("ItemDetail");
  }

  function goToSearch() {
    navigation.navigate("Search");
  }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Item Detail"
        onPress={goToItemDetail}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
      <Button
        title="Search..."
        onPress={goToSearch}
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

export default withFirebaseHOC(Home);
