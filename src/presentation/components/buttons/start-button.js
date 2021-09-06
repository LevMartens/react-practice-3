import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SCREEN_WIDTH } from "../../domain/resources/environment/dimensions";

export default function StartButton({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate("GPSLive");
      }}
    >
      <Text style={styles.text}>{"Start"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#d8b384",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
    backgroundColor: "#c84b31",
    bottom: 0,
    width: SCREEN_WIDTH,

    height: 100,
    position: "absolute",
  },
  text: {
    paddingBottom: 20,
    color: "#fff5eb",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Evolventa",
  },
});
