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

  function goToUpload() {
    navigation.navigate("Upload");
  }

  function goToChat() {
    let data = {"yolo": true}
    firebase.pushToFirestore(data);
    // navigation.navigate("Chat", { name: "John Cena" } );
  }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Signout"
        onPress={handleSignout}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
      <Button
        title="Upload"
        onPress={goToUpload}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
      <Button
        title="Chat"
        onPress={goToChat}
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
