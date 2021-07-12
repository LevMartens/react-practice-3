import React, { useEffect } from "react";
import {
  currentPositionUpdate,
  updatePath,
} from "../../presentation/state-management/actions/actions";
import * as Location from "expo-location";
import store from "../../presentation/state-management/store/store";
import {
  getCoordinatesBetween,
  getDistanceBetween,
  setOneMeterApart,
} from "../../Core/Calculations";
import { measure } from "react-native-reanimated";
import { Polyline } from "react-native-maps";

export const watchPositionForeground = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log("denied");
  }

  await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 10,
    },
    async (loc) => {
      var currentPosition = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      store.dispatch(currentPositionUpdate(currentPosition));
    }
  );
};
