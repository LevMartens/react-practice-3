export const lineMarkersHandler = (
  state = [
    {
      isLoaded: false,
    },
  ],
  action
) => {
  switch (action.type) {
    case "GETLINEMARKERS":
      return action.lineMarkers;
    default:
      return state;
  }
};

export const bannerHandler = (
  state = {
    visible: false,
    message: "Bonjorno",
  },

  action
) => {
  switch (action.type) {
    case "OPENBANNER":
      return action.event;
    default:
      return state;
  }
};

export const selectedMarkerHandler = (
  state = {
    id: 0,
    isLoaded: false,
  },

  action
) => {
  switch (action.type) {
    case "SELECTMARKER":
      return action.event;
    case "RESETMARKER":
      return state;
    default:
      return state;
  }
};

/* 
selectedLineDraftHandler: Handles the line draft that is currently selected. 
Line draft data will go through the handler when a line is created or when a draft is selected ready for execution.
A variable will hold on to the current line draft data untill the user finishes the line, 
then the line draft data will be used to save a completed line and the 
currently selected line draft data will be reset with state. 
*/
export const selectedLineDraftHandler = (
  state = {
    id: 0,
    isLoaded: false,
    rawLineData: {
      distance: "NO DISTANCE",
      elevationPoints: [],
    },
  },
  action
) => {
  switch (action.type) {
    case "SELECTLINEDRAFT":
      console.log(
        "LOG: New line draft selected. source: line-data-handlers.js"
      );
      return action.event;
    case "RESETLINEDRAFT":
      console.log("LOG: Line draft reset. source: line-data-handlers.js");
      return state;
    default:
      return state;
  }
};

export const lineTitleHandler = (state = "Nameless", action) => {
  switch (action.type) {
    case "ADDLINETITLE":
      return action.event;
    default:
      return state;
  }
};
