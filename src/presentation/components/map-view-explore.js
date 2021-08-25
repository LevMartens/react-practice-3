import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { getTheme } from "../theme/themes";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Image, Text } from "react-native";
import { getPositionOnce } from "../../domain/resources/environment/get-position-once";
import { getLineMarkers } from "../../domain/use_cases/get-line-markers";
import { useSelector } from "react-redux";
import { selectMarker } from "../state-management/actions/actions";
import store from "../state-management/store/store";
import Modal from "react-native-modalbox";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "../../domain/resources/environment/dimensions";

export default function MapViewExplore() {
  useEffect(() => {
    getPositionOnce(); //TODO this function bypasses use_cases
  }, []);

  const markerCurrentlySelected = useSelector(
    (state) => state.selectedMarkerHandler
  );

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

  let mapView;
  const sheetRef = useRef();

  const positionHasChanged = async function (currentRegion) {
    getLineMarkers(currentRegion);
  };

  return aSingleCurrentPosition.isLoaded === true ? (
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
        const {
          id,
          isLoaded,
          markerCoordinates,
          markerRegion,
          image,
          imageSelected,
        } = marker;

        if (isLoaded === true) {
          return (
            <Marker
              key={id}
              coordinate={markerCoordinates}
              onPress={() => {
                mapView.animateToRegion(markerRegion, 1000);
                store.dispatch(selectMarker(marker));
              }}
            >
              <Image
                source={
                  id === markerCurrentlySelected.id ? imageSelected : image
                }
                style={themedStyles.lineMarkerImageLayout}
                resizeMode="contain"
              />
            </Marker>
          );
        }
      })}
      <Modal
        style={themedStyles.modal}
        animationDuration={500}
        swipeThreshold={50}
        ref={sheetRef}
        isOpen={markerCurrentlySelected.isLoaded}
        backdrop={false}
        swipeToClose={true}
        onClosingState={() => {
          store.dispatch(selectMarker({ id: 0, isLoaded: false }));
        }}
      >
        {/* <View>
          <Image source={markerCurrentlySelected.rawLineData.images[0]}></Image>
        </View> */}
      </Modal>
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
    modal: {
      marginTop: 250,
      borderRadius: 10,
      height: 250,
      backgroundColor: theme.tertiaryColor,
      opacity: 0.8,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
