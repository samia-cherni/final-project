
const initialState = {
    ids:[],
    loading:false,
    users:[],
    posts:[],
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: action.payload };
    case "GET_USER":
      return { ...state, users: [...state.users, action.payload.user] };
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case "GET_IDS":
      return { ...state, ids: [...state.ids, action.payload] };
    case "GET_PROFILE_POSTS":
      return { ...state, posts: [...state.posts, action.payload]};
    case "DELETE_USER":
      return {
        ...state,
        ids: state.ids.filter((id) => id !== action.payload),
      };
    case "UPDATE_PROFILE_POSTS":
      return{
        ...state,
        posts:state.posts.map(el=>el._id===action.payload._id?action.payload:el)
      }
    default:
      return state;
  }
};
export default profileReducer;
