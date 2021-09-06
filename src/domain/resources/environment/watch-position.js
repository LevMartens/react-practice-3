import { currentPositionUpdate } from "../../../presentation/state-management/actions/actions";
import * as Location from "expo-location";
import store from "../../../presentation/state-management/store/store";

export const watchPosition = async (callback) => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log("denied");
  }

  await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 10,
    },
    async (loc) => callback(loc)
  );
};
