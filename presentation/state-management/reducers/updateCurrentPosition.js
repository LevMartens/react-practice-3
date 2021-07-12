import {
  getCoordinatesBetween,
  getDistanceBetween,
  setOneMeterApart,
} from "../../../Core/Calculations";

const Melbourne = {
  latitude: -37.840935,
  longitude: 144.946457,
};

const Carlton = {
  latitude: -37.794932,
  longitude: 144.973475,
};

const aSingleCarltonState = {
  latitude: -37.794932,
  longitude: 144.973475,
  isLoaded: false,
};

var object = {
  isWithin20m: false,
  path: [],
  //pathColors: [],
};

export const watchCurrentPosition = (state = Melbourne, action) => {
  switch (action.type) {
    case "WATCHCURRENTPOSITION":
      //console.log("in reducer " + action.newCoordinates.longitude);
      return action.newCoordinates;

    default:
      //console.log("in reducer STATE " + state.longitude);
      return state;
  }
};

export const aSingleCurrentPosition = (state = aSingleCarltonState, action) => {
  switch (action.type) {
    case "GETCURRENTPOSITIONONCE":
      return {
        latitude: action.coordinates.latitude,
        longitude: action.coordinates.longitude,
        isLoaded: true,
      };

    default:
      return state;
  }
};

export const updatePathReducer = (state = object, action) => {
  switch (action.type) {
    case "UPDATEPATH":
      return {
        isWithin20m: action.isWithin20m,
        path: action.path,
        //pathColors: action.pathColorsArray,
      };

    default:
      return state;
  }
};

export const watchDirection = (state = 0.0, action) => {
  switch (action.type) {
    case "WATCHDIRECTION":
      return action.newDirection;
    default:
      return state;
  }
};
