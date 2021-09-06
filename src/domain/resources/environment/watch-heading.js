import {
  updateCurrentDirection,
  setHeadingWatcher,
} from "../../../presentation/state-management/actions/actions";
import * as Location from "expo-location";
import store from "../../../presentation/state-management/store/store";

export async function watchHeading() {
  const headingWatcher = await Location.watchHeadingAsync((headObj) => {
    const { trueHeading, magHeading } = headObj;
    const heading = trueHeading != -1 ? trueHeading : magHeading;

    store.dispatch(updateCurrentDirection(heading));
  });
  store.dispatch(setHeadingWatcher(headingWatcher)); // This is needed to unsubscribe ron
}
