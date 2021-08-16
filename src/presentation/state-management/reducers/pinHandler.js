export const setPin = (state = "Set starting point", action) => {
  switch (action.type) {
    case "SETPINSTARTINGPOINT":
      return "Set end point";
    case "SETPINENDPOINT":
      return "Done!";

    default:
      return state;
  }
};

export default setPin;
