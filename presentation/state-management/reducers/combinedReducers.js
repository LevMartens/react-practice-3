import { combineReducers } from "redux";
import setPin from "./pinHandler";
import {
  mapPressHandlerFirstPin,
  mapPressHandlerSecondPin,
  mapPressHandlerThirdPin,
} from "./mapPressHandler";
import {
  watchCurrentPosition,
  watchDirection,
  updatePathReducer,
  aSingleCurrentPosition,
} from "./updateCurrentPosition";
import { lineMarkersHandler, snackbarHandler } from "./line-marker-handler";

export default combineReducers({
  snackbarHandler: snackbarHandler,
  lineMarkersHandler: lineMarkersHandler,
  setPin: setPin,
  mapPressHandlerFirstPin: mapPressHandlerFirstPin,
  mapPressHandlerSecondPin: mapPressHandlerSecondPin,
  mapPressHandlerThirdPin: mapPressHandlerThirdPin,
  watchCurrentPosition: watchCurrentPosition,
  watchDirection: watchDirection,
  updatePathReducer: updatePathReducer,
  aSingleCurrentPosition: aSingleCurrentPosition,
});
