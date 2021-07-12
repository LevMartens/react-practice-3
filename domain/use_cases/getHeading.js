import {
  currentPositionUpdate,
  mapPressedForFirstPin,
  mapPressedForSecondPin,
  mapPressedForThirdPin,
  updateCurrentDirection,
} from "../../presentation/state-management/actions/actions";
import * as Location from "expo-location";
import store from "../../presentation/state-management/store/store";

export async function getHeading() {
  await Location.watchHeadingAsync((headObj) => {
    head = headObj.trueHeading != -1 ? headObj.trueHeading : headObj.magHeading;

    store.dispatch(updateCurrentDirection(head));
  });
}
