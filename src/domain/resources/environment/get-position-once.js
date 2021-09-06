import * as Location from "expo-location";
import store from "../../../presentation/state-management/store/store";
import { updateCurrentPositionOnce } from "../../../presentation/state-management/actions/actions";

export const getPositionOnce = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log(
      "Foreground location permission denied, see: get-location-once.js"
    );
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    if (location !== null) {
      const { coords: coordinates } = location;
      store.dispatch(updateCurrentPositionOnce(coordinates));

      return coordinates;
    }
  } catch (error) {
    console.log("ERROR: " + error + " see: get-position-once.js");
  }
};
