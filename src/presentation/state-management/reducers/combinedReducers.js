import { combineReducers } from "redux";
import {
  startMarkerHandler,
  endMarkerHandler,
  createLineStateHandler,
} from "./create-line-handler";
import {
  watchCurrentPosition,
  watchDirection,
  aSingleCurrentPosition,
  positionWatcherHandler,
  headingWatcherHandler,
} from "./location-handler";
import {
  lineMarkersHandler,
  bannerHandler,
  selectedMarkerHandler,
  selectedLineDraftHandler,
  lineTitleHandler,
} from "./line-data-handlers";
import { pathHandler } from "./live-line-recording-handler";

export default combineReducers({
  headingWatcherHandler,
  positionWatcherHandler,
  pathHandler,
  lineTitleHandler,
  selectedLineDraftHandler,
  selectedMarkerHandler,
  bannerHandler,
  lineMarkersHandler,
  createLineStateHandler,
  startMarkerHandler,
  endMarkerHandler,
  watchCurrentPosition,
  watchDirection,
  aSingleCurrentPosition,
});

//TODO test if the shorthand version works on combined reducers
// headingWatcherHandler: headingWatcherHandler,
// positionWatcherHandler: positionWatcherHandler,
// pathHandler: pathHandler,
// lineTitleHandler: lineTitleHandler,
// selectedLineDraftHandler: selectedLineDraftHandler,
// selectedMarkerHandler: selectedMarkerHandler,
// bannerHandler: bannerHandler,
// lineMarkersHandler: lineMarkersHandler,
// createLineStateHandler: createLineStateHandler,
// startMarkerHandler: startMarkerHandler,
// endMarkerHandler: endMarkerHandler,
// mapPressHandlerThirdPin: mapPressHandlerThirdPin,
// watchCurrentPosition: watchCurrentPosition,
// watchDirection: watchDirection,
// aSingleCurrentPosition: aSingleCurrentPosition,
