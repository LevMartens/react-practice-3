import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { startProducingPath } from "../../domain/use_cases/start-producing-path";
import { useSelector } from "react-redux";

export default function StartRecordingButton() {
  const {
    rawLineData: {
      distance,
      startingCoordinates: { lat: pointALat, lng: pointALng },
      finishCoordinates: { lat: pointBLat, lng: pointBLng },
    },
  } = useSelector((state) => state.selectedLineDraftHandler);

  const positionWatcher = useSelector((state) => state.positionWatcherHandler);

  const pointA = {
    latitude: pointALat,
    longitude: pointALng,
  };

  const pointB = {
    latitude: pointBLat,
    longitude: pointBLng,
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        positionWatcher.remove();
        startProducingPath(pointA, pointB, distance);
      }}
    >
      <Text style={styles.text}>{"Start Recording"}</Text>
    </TouchableOpacity>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
    backgroundColor: "#c84b31",
    bottom: 0,
    width: 400,
    height: 100,
    position: "absolute",
  },
  text: {
    paddingBottom: 20,
    color: "#fff5eb",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Evolventa",
  },
});
