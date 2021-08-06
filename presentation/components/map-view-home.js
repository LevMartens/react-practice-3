import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { getTheme } from "../theme/themes";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { getPositionOnce } from "../../domain/resources/environment/get-position-once";
import { getLineMarkers } from "../../domain/use_cases/get-line-markers";
import { throttle } from "lodash";
import { useSelector } from "react-redux";

export default function MapViewHome() {
  useEffect(() => {
    getPositionOnce();
  }, []);

  const aSingleCurrentPosition = useSelector(
    (state) => state.aSingleCurrentPosition
  );
  const lineMarkers = useSelector((state) => state.lineMarkersHandler);
  const themedStyles = styles();
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 1.2;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const initialRegion = {
    latitude: aSingleCurrentPosition.latitude,
    longitude: aSingleCurrentPosition.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  var previousRegion = initialRegion;
  var mapView = {};

  const positionHasChanged = throttle(function (currentRegion, t1) {
    getLineMarkers(previousRegion, currentRegion, t1);
    previousRegion = currentRegion;
  }, 0);

  return aSingleCurrentPosition.isLoaded == true ? (
    <MapView
      ref={(ref) => (mapView = ref)}
      showsUserLocation={true}
      liteMode={true}
      style={themedStyles.mapView}
      onRegionChangeComplete={(region) => {
        var t1 = performance.now();
        positionHasChanged(region, t1);
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
