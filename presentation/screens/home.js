import React from "react";
import MapViewComponent from "../components/MapView";
import PinMarkButton from "../components/PinMarkButton";
import { StyleSheet, View } from "react-native";
import MapViewHome from "../components/map-view-home";
import GPSLiveMapView from "../components/GPSLiveMapView";
import { getPositionOnce } from "../../domain/use_cases/get-position-once";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <MapViewHome></MapViewHome>
    </View>
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
});
