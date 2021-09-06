export const pathHandler = (state = [], action) => {
  switch (action.type) {
    case "UPDATEPATH":
      return action.event;
    default:
      return state;
  }
};
