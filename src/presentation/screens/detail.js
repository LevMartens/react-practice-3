import React from "react";
import MapViewCreateLine from "../components/map-view-create-line";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import StartButton from "../components/StartButton";

export default function DetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapViewCreateLine> </MapViewCreateLine>
      </View>

      <Text style={styles.text}> {"Details of your straight line"} </Text>

      <Text style={styles.text2}> {"Distance: "} </Text>
      <Text style={styles.text3}> {"Elevation: "} </Text>
      <Text style={styles.text3}> {"Difficulty: "} </Text>
      <Text style={styles.text3}> {"Starting point: "} </Text>
      <Text style={styles.text3}> {"End point: "} </Text>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.text1}>{"Directions to starting point"}</Text>
      </TouchableOpacity>
      <StartButton navigation={navigation}></StartButton>
    </View>
  );
}
const styles = StyleSheet.create({
  mapView: {
    marginTop: 40,
    flexDirection: "row",
    alignSelf: "center",
    width: 300,
    height: 150,
    backgroundColor: "#FF616D",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",

    alignSelf: "center",
    //marginTop: 20,
    backgroundColor: "#c84b31",
    //right: 20,
    top: 40,
    //bottom: 20,
    width: 250,
    height: 50,
    borderRadius: 5,
    //position: "absolute",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#284538",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },

  text: {
    marginTop: 20,
    fontSize: 25,
    color: "#fff5eb",
    textAlign: "center",
    fontFamily: "Evolventa",
  },
  text1: {
    //paddingBottom: 50,
    //marginLeft: 20,
    marginTop: 13,
    fontSize: 17,
    color: "#fff5eb",
    textAlign: "center",
    fontFamily: "Evolventa",
  },
  text2: {
    marginLeft: 15,
    marginTop: 40,
    fontSize: 20,
    color: "#fff5eb",
    textAlign: "left",
    fontFamily: "Evolventa",
  },
  text3: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 20,
    color: "#fff5eb",
    textAlign: "left",
    fontFamily: "Evolventa",
  },
});
