const Melbourne = {
  latitude: -37.840935,
  longitude: 144.946457,
};

const aSingleCarltonState = {
  latitude: -37.794932,
  longitude: 144.973475,
  isLoaded: false,
};

export const watchCurrentPosition = (state = Melbourne, action) => {
  switch (action.type) {
    case "WATCHCURRENTPOSITION":
      return action.newCoordinates;
    default:
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

export const watchDirection = (state = 0.0, action) => {
  switch (action.type) {
    case "WATCHDIRECTION":
      return action.newDirection;
    default:
      return state;
  }
};

export const positionWatcherHandler = (
  state = { remove: function () {} },
  action
) => {
  switch (action.type) {
    case "SETWATCHER":
      return action.event;
    default:
      return state;
  }
};

export const headingWatcherHandler = (
  state = { remove: function () {} },
  action
) => {
  switch (action.type) {
    case "SETHEADINGWATCHER":
      return action.event;
    default:
      return state;
  }
};
