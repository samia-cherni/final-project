const initialState = {
  loading: false,
  timelineposts: [],
  result: 0,
  page: 2,
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return { ...state, timelineposts: [action.payload,...state.timelineposts] };
    case "LOADING_POST":
      return {...state,loading:action.payload};
    case "GET_TIMELINE_POSTS":
    return {
      ...state,
      timelineposts: action.payload.timelinePosts,
      result: action.payload.result,
      page: action.payload.page,
    };
    case "UPDATE_POST":
      return {...state,timelineposts:state.timelineposts.map(post=>post._id===action.payload._id?action.payload:post)};
    case "DELETE_POST":
      return {...state,timelineposts:state.timelineposts.filter(post=>post._id!==action.payload._id)}
    default:
      return state;
  }
};
export default postReducer;
