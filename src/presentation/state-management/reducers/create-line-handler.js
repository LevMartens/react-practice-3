const Melbourne = {
  latitude: -37.840935,
  longitude: 144.946457,
};

const Carlton = {
  latitude: -37.794932,
  longitude: 144.973475,
};

export const startMarkerHandler = (state = Melbourne, action) => {
  switch (action.type) {
    case "MAPPRESSFORFIRSTPIN":
      return action.newCoordinates;
    default:
      return state;
  }
};

export const endMarkerHandler = (state = Carlton, action) => {
  switch (action.type) {
    case "MAPPRESSFORSECONDPIN":
      return action.newCoordinates;
    default:
      return state;
  }
};

export const createLineStateHandler = (
  state = "Set starting point",
  action
) => {
  switch (action.type) {
    case "RESET":
      return "Set starting point";
    case "SETPINSTARTINGPOINT":
      return "Set end point";
    case "SETPINENDPOINT":
      return "Done!";

    default:
      return state;
  }
};
