import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";

function SearchScreen({ navigation, firebase }) {

  function goToSearchResults() {
    navigation.navigate("SearchResults");
  }

  return (
    <View style={styles.container}>
      <Text>Search Screen!</Text>
      <Button
        title="Search Results"
        onPress={goToSearchResults}
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

export default withFirebaseHOC(SearchScreen);