const Melbourne = {
  latitude: -37.840935,
  longitude: 144.946457,
};

const Carlton = {
  latitude: -37.794932,
  longitude: 144.973475,
};

export const mapPressHandlerFirstPin = (state = Melbourne, action) => {
  switch (action.type) {
    case "MAPPRESSFORFIRSTPIN":
      return action.newCoordinates;
    default:
      return state;
  }
};

export const mapPressHandlerSecondPin = (state = Carlton, action) => {
  switch (action.type) {
    case "MAPPRESSFORSECONDPIN":
      return action.newCoordinates;
    default:
      return state;
  }
};

export const mapPressHandlerThirdPin = (state = Melbourne, action) => {
  switch (action.type) {
    case "MAPPRESSFORTHIRDPIN":
      return action.newCoordinates;
    default:
      return state;
  }
};
