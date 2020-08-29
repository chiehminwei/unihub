import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";

function AllChatScreen({ navigation, firebase }) {

  function goToChat() {
    navigation.navigate("ChatDetail", { name: "John Cena" });
  }

  return (
    <View style={styles.container}>
      <Text>All Chat Screen!</Text>
      <Button
        title="Go to Chat Detail"
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

export default withFirebaseHOC(AllChatScreen);