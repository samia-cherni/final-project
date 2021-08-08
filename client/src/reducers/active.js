const activeReducer = (state = false, action) => {
  switch (action.type) {
    case "ACTIVE":
      return action.payload;
    default:
      return state;
  }
};
export default activeReducer;
