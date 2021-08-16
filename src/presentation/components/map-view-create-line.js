import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import MapView, { Polyline, Marker, Circle } from "react-native-maps";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  LONGITUDE_DELTA,
  LATITUDE_DELTA,
} from "../../domain/resources/environment/dimensions";
import SnackBar from "react-native-snackbar-component";
import {
  mapPressedForFirstPin,
  mapPressedForSecondPin,
} from "../state-management/actions/actions";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { getCoordinatesBetween } from "../../domain/generators/Calculations";
import { getTheme } from "../theme/themes";

export default function MapViewCreateLine() {
  const themedStyles = styles();
  // render() {
  //   const Melbourne = {
  //     latitude: -37.840935,
  //     longitude: 144.946457,
  //   };

  //   const Carlton = {
  //     latitude: -37.794932,
  //     longitude: 144.973475,
  //   };

  const pinState = useSelector((state) => state.setPin);
  const firstPinCoordinates = useSelector(
    (state) => state.mapPressHandlerFirstPin
  );
  const secondPinCoordinates = useSelector(
    (state) => state.mapPressHandlerSecondPin
  );

  const aSingleCurrentPosition = useSelector(
    (state) => state.aSingleCurrentPosition
  );

  const initialRegion = {
    latitude: aSingleCurrentPosition.latitude,
    longitude: aSingleCurrentPosition.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const mapPressed = (coordinates) => {
    pinState == "Set starting point" && mapPressedForFirstPin(coordinates);
    pinState == "Set end point" && mapPressedForSecondPin(coordinates);
  };

  const startMarkerID = uuidv4();
  const finishMarkerID = uuidv4();

  return (
    <MapView
      onPress={(e) => mapPressed(e.nativeEvent.coordinate)}
      style={themedStyles.map}
      initialRegion={initialRegion}
    >
      <Marker
        draggable
        key={startMarkerID}
        zIndex={1000}
        centerOffset={{ x: 0, y: -12 }}
        coordinate={secondPinCoordinates}
        title={"Finish"}
        description={"The end point of your straight line"}
        //pinColor={"#3a6351"}
      >
        <Image
          source={
            pinState == "Set end point"
              ? require("../../../assets/marker7.png")
              : require("../../../assets/marker6.png")
          }
          style={{
            zIndex: 1000,
            width: 60,
            height: 60,
          }}
          resizeMode="contain"
        />
      </Marker>

      <Marker
        draggable
        centerOffset={{ x: 0, y: -12 }}
        key={1}
        zIndex={10000}
        coordinate={firstPinCoordinates}
        title={"Start"}
        description={"The starting point of your straight line"}
        //pinColor={"#3a6351"}
      >
        <Image
          source={
            pinState == "Set starting point"
              ? require("../../../assets/marker8.png")
              : require("../../../assets/marker5.png")
          }
          style={{
            zIndex: 1000,
            width: 60,
            height: 60,
          }}
          resizeMode="contain"
        />
      </Marker>

      <Polyline
        strokeColor={"#B61919"}
        strokeWidth={3}
        coordinates={[firstPinCoordinates, secondPinCoordinates]}
      />
    </MapView>
  );
  //}
}
//#223B30"

const styles = () => {
  const theme = getTheme();
  return StyleSheet.create({
    textView: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "#0A1D37",
      flex: 1,
      flexDirection: "column",
      height: "100%",
    },

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
      width: 200,
      height: 50,
      position: "absolute",
    },
    text: {
      color: "#fff5eb",
      textAlign: "center",
    },
  });
};

// const mapStateToProps = (state) => {
//   return {
//     mapPressHandlerFirstPin: state.mapPressHandlerFirstPin,
//     mapPressHandlerSecondPin: state.mapPressHandlerSecondPin,
//     setPin: state.setPin,
//   };
// };

// const mapDispatchToProps = () => {
//   return {
//     mapPressedForFirstPin: mapPressedForFirstPin,
//     mapPressedForSecondPin: mapPressedForSecondPin,
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps()
// )(MapViewCreateLine);
