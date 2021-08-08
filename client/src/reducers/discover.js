const initialState = {
    loading:false,
    posts:[],
    result:9,
    page:2,
    firstLoad:false,
};
const discoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISCOVER_LOADING":
      return {
          ...state,
          loading:action.payload,
      }
      case "GET_DISCOVER_POSTS":
          return{
              ...state,
              posts:action.payload.posts,
              result:action.payload.result,
              firstLoad:true,
          }
       case "UPDATE_DISCOVER_POSTS":
           return {
             ...state,
             posts: action.payload.posts,
             result: action.payload.result,
             page:state.page+1,
           };
    default:
      return state;
  }
};
export default discoverReducer;
