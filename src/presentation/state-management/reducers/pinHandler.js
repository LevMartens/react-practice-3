export const setPin = (state = "Set starting point", action) => {
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

export default setPin;
