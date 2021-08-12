import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { getTheme } from "../theme/themes";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Image } from "react-native";
import { getPositionOnce } from "../../domain/resources/environment/get-position-once";
import { getLineMarkers } from "../../domain/use_cases/get-line-markers";
import { throttle, debounce } from "lodash";
import { useSelector } from "react-redux";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "../../domain/resources/environment/dimensions";

export default function MapViewHome() {
  useEffect(() => {
    getPositionOnce(); //TODO this function bypasses use_cases
  }, []);

  const lineMarkers = useSelector((state) => state.lineMarkersHandler);
  const aSingleCurrentPosition = useSelector(
    (state) => state.aSingleCurrentPosition
  );
  const themedStyles = styles();
  const initialRegion = {
    latitude: aSingleCurrentPosition.latitude,
    longitude: aSingleCurrentPosition.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  let previousRegion = {
    latitude: initialRegion.latitude + 0.2, // Initialised with +0.2 to have enough Δdistance for the first marker fetch
    longitude: initialRegion.longitude + 0.2, // +0.2 is set for zoomlevel 10.4
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  let mapView;

  const positionHasChanged = async function (currentRegion) {
    getLineMarkers(previousRegion, currentRegion);
    previousRegion = currentRegion;
  };

  return aSingleCurrentPosition.isLoaded == true ? (
    <MapView
      ref={(ref) => (mapView = ref)}
      showsUserLocation={true}
      liteMode={true}
      style={themedStyles.mapView}
      onRegionChangeComplete={(region) => {
        positionHasChanged(region);
      }}
      initialRegion={initialRegion}
    >
      {lineMarkers.map((marker) => {
        if (marker.isLoaded === true) {
          return (
            <Marker
              key={marker.rawLineData.startingCoordinates.id}
              coordinate={marker.coordinates}
              onPress={() => mapView.animateToRegion(marker.markerRegion, 1000)}
            >
              <Image
                source={marker.image}
                style={themedStyles.lineMarkerImageLayout}
                resizeMode="contain"
              />
            </Marker>
          );
        }
      })}
    </MapView>
  ) : (
    <View style={themedStyles.activityIndicatorView}>
      <ActivityIndicator
        animating={true}
        color={themedStyles.activityIndicator}
        size={"large"}
      />
    </View>
  );
}

const styles = () => {
  const theme = getTheme();
  return StyleSheet.create({
    activityIndicator: {
      color: theme.buttonColor,
    },
    activityIndicatorView: {
      height: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    lineMarkerImageLayout: {
      width: 40,
      height: 40,
    },
    mapView: {
      ...StyleSheet.absoluteFillObject,
    },
  });
};
