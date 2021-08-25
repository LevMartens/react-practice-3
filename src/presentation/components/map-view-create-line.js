import React from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { StyleSheet, Image } from "react-native";
import {
  LONGITUDE_DELTA,
  LATITUDE_DELTA,
} from "../../domain/resources/environment/dimensions";
import {
  mapPressedForFirstPin,
  mapPressedForSecondPin,
} from "../state-management/actions/actions";
import { getTheme } from "../theme/themes";
import store from "../state-management/store/store";

//TODO place markers based on current position

export default function MapViewCreateLine({ initialRegion }) {
  const themedStyles = styles();

  const pinState = useSelector((state) => state.setPin);
  const firstPinCoordinates = useSelector(
    (state) => state.mapPressHandlerFirstPin
  );
  const secondPinCoordinates = useSelector(
    (state) => state.mapPressHandlerSecondPin
  );

  const mapPressed = (coordinates) => {
    pinState == "Set starting point" &&
      store.dispatch(mapPressedForFirstPin(coordinates));
    pinState == "Set end point" &&
      store.dispatch(mapPressedForSecondPin(coordinates));
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
        key={finishMarkerID}
        zIndex={1000}
        centerOffset={themedStyles.markerCenterOffset}
        coordinate={secondPinCoordinates}
        title={"Finish"}
        description={"The end point of your straight line"}
      >
        <Image
          source={
            pinState == "Set end point"
              ? themedStyles.finishPinBeforeSet
              : themedStyles.finishPinAfterSet
          }
          style={themedStyles.pinLayout}
          resizeMode="contain"
        />
      </Marker>

      <Marker
        draggable
        key={startMarkerID}
        centerOffset={themedStyles.markerCenterOffset}
        zIndex={10000}
        coordinate={firstPinCoordinates}
        title={"Start"}
        description={"The starting point of your straight line"}
      >
        <Image
          source={
            pinState == "Set starting point"
              ? themedStyles.startPinBeforeSet
              : themedStyles.startPinAfterSet
          }
          style={themedStyles.pinLayout}
          resizeMode="contain"
        />
      </Marker>

      <Polyline
        strokeColor={themedStyles.lineColor}
        strokeWidth={3}
        coordinates={[firstPinCoordinates, secondPinCoordinates]}
      />
    </MapView>
  );
}

const styles = () => {
  const theme = getTheme();
  return {
    finishPinBeforeSet: theme.finishPinBeforeSet,
    finishPinAfterSet: theme.finishPinAfterSet,
    startPinBeforeSet: theme.startPinBeforeSet,
    startPinAfterSet: theme.startPinAfterSet,
    lineColor: theme.polylineColor,
    pinLayout: {
      zIndex: 1000,
      width: 60,
      height: 60,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    markerCenterOffset: { x: 0, y: -12 },
  };
};
