import React from "react";
import MapViewCreateLine from "../../presentation/components/map-view-create-line";
import PinMarkButton from "../components/PinMarkButton";
import { StyleSheet, View } from "react-native";

export default function CreateLineScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapViewCreateLine> </MapViewCreateLine>
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
