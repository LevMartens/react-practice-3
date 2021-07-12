import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export class StartRecordingButton extends Component {
  render() {
    console.log("StartRecordingButton rendered");

    const navigation = this.props.navigation;

    return (
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>{"Start Recording"}</Text>
      </TouchableOpacity>
    );
  }
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
    width: 400,
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

export default StartRecordingButton;
