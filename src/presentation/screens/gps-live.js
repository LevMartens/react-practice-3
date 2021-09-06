import React from "react";
import MapViewGPSLive from "../components/mapviews/map-view-gps-live";
import { StyleSheet, View } from "react-native";
import StartRecordingButton from "../components/buttons/start-recording-button";

export default function GPSLiveScreen() {
  return (
    <View style={styles.container}>
      <MapViewGPSLive> </MapViewGPSLive>
      <StartRecordingButton> </StartRecordingButton>
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
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#3A6351",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },

  text: {
    marginTop: 20,
    fontSize: 25,
    color: "#fff5eb",
    textAlign: "center",
  },
  text1: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
    color: "#fff5eb",
    textAlign: "left",
  },
});
