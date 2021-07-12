import React from "react";
import MapViewComponent from "../components/MapView";
import PinMarkButton from "../components/PinMarkButton";
import { StyleSheet, View } from "react-native";

export default function AddLineScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapViewComponent> </MapViewComponent>
      <PinMarkButton navigation={navigation}> </PinMarkButton>
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
