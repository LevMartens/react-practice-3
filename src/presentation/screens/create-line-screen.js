import React from "react";
import MapViewCreateLine from "../../presentation/components/mapviews/map-view-create-line";
import PinSetButton from "../components/buttons/pin-set-button";
import { StyleSheet, View } from "react-native";
import { getTheme } from "../theme/themes";
import { useSelector } from "react-redux";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "../../domain/resources/environment/dimensions";

//TODO give aSingleCurrentPosition an "isLoaded" and render MapViewCreateLine conditionally

export default function CreateLineScreen({ navigation }) {
  const themedStyles = styles();
  const { latitude, longitude } = useSelector(
    (state) => state.aSingleCurrentPosition
  );

  const initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <View style={themedStyles.container}>
      <MapViewCreateLine initialRegion={initialRegion}> </MapViewCreateLine>
      <PinSetButton navigation={navigation}> </PinSetButton>
    </View>
  );
}
const styles = () => {
  const theme = getTheme();
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.containerBackgroundColor,
      flex: 1,
      flexDirection: "column",
      height: "100%",
    },
  });
};
