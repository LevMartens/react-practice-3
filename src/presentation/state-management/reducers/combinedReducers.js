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
import {
  lineMarkersHandler,
  bannerHandler,
  selectedMarkerHandler,
  selectedLineDraftHandler,
  lineTitleHandler,
} from "./line-data-handlers";
import { pathHandler } from "./live-line-recording-handler";

export default combineReducers({
  pathHandler: pathHandler,
  lineTitleHandler: lineTitleHandler,
  selectedLineDraftHandler: selectedLineDraftHandler,
  selectedMarkerHandler: selectedMarkerHandler,
  bannerHandler: bannerHandler,
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
