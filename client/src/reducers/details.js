const initialState = [];
const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POST":
      return [...state, action.payload];
    case "UPDATE_POST":
      return state.map(el=>el._id===action.payload._id?action.payload:el)
    default:
      return state;
  }
};
export default detailReducer;
