export const setPinStartingPoint = () => {
  return {
    type: "SETPINSTARTINGPOINT",
  };
};

export const setPinEndPoint = () => {
  return {
    type: "SETPINENDPOINT",
  };
};

export const mapPressedForFirstPin = (event) => {
  return {
    newCoordinates: event,
    type: "MAPPRESSFORFIRSTPIN",
  };
};

export const mapPressedForSecondPin = (event) => {
  return {
    newCoordinates: event,
    type: "MAPPRESSFORSECONDPIN",
  };
};

export const mapPressedForThirdPin = (event) => {
  return {
    newCoordinates: event,
    type: "MAPPRESSFORTHIRDPIN",
  };
};

export const currentPositionUpdate = (event) => {
  return {
    newCoordinates: event,
    type: "WATCHCURRENTPOSITION",
  };
};

export const updateCurrentPositionOnce = (coordinates) => {
  return {
    coordinates: coordinates,
    type: "GETCURRENTPOSITIONONCE",
  };
};

export const updateCurrentDirection = (event) => {
  return {
    newDirection: event,
    type: "WATCHDIRECTION",
  };
};

export const updatePath = (
  pointA,
  pointB,
  aMeter,
  currentPosition,
  measurePoint,
  //pathColorsArray,
  path,
  isWithin20m
) => {
  return {
    pointA: pointA,
    pointB: pointB,
    aMeter: aMeter,
    currentPosition: currentPosition,
    measurePoint: measurePoint,
    //pathColorsArray: pathColorsArray,
    path: path,
    isWithin20m: isWithin20m,
    type: "UPDATEPATH",
  };
};

export const sendLineMarkers = (event) => {
  return {
    lineMarkers: event,
    type: "GETLINEMARKERS",
  };
};
