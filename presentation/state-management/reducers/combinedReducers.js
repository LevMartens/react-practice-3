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
import { lineMarkersHandler } from "./line-marker-handler";

export default combineReducers({
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
