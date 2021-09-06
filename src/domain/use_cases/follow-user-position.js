import { watchPosition } from "../resources/environment/watch-position";
import store from "../../presentation/state-management/store/store";
import { currentPositionUpdate } from "../../presentation/state-management/actions/actions";

export async function followUserPosition() {
  const callback = (location) => {
    console.log("TEST: followUserPosition location update");
    const {
      coords: { latitude, longitude },
    } = location;

    const currentPosition = {
      latitude: latitude,
      longitude: longitude,
    };

    store.dispatch(currentPositionUpdate(currentPosition));
  };

  watchPosition(callback);
}
