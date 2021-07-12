import React from "react";
import * as Location from "expo-location";
import store from "../../presentation/state-management/store/store";
import { updateCurrentPositionOnce } from "../../presentation/state-management/actions/actions";

export const getPositionOnce = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log(
      "Foreground location permission denied, see: get-location-once.js"
    );
  }

  try {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    if (location !== null) {
      store.dispatch(updateCurrentPositionOnce(location.coords));

      return location.coords;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};
