import { getDataAPI, postDataAPI, putDataAPI,deleteDataAPI} from "../api/index";
export const createPost =
  ({ postData, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALERT", payload: { loading: true } });
      const res = await postDataAPI("posts", postData, auth.token);
      dispatch({
        type: "CREATE_POST",
        payload: { ...res.data.newPost, creator: auth.user },
      });
      console.log(res);
      dispatch({ type: "ALERT", payload: { loading: false } });
      dispatch({ type: "ALERT", payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
    }
  };
export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_POST", payload: true });
    const result = await getDataAPI("posts", token);
    //   console.log(result);
    dispatch({ type: "GET_TIMELINE_POSTS", payload: {...result.data,page: 2} });
    dispatch({ type: "LOADING_POST", payload: false });
  } catch (error) {
    dispatch({
      type: "ALERT",
      payload: { error: error.response.data.msg },
    });
  }
};
export const updatePost =
  ({ postData, auth, active }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALERT", payload: { loading: true } });
      const res = await putDataAPI(`post/${active._id}`, postData, auth.token);
      console.log(res);
      dispatch({ type: "UPDATE_POST", payload: res.data.updatedPost });
      dispatch({ type: "ALERT", payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
    }
  };
export const likePost =
  ({ auth, post }) =>
  async (dispatch) => {
    console.log(post);
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    console.log({ newPost });
    dispatch({ type: "UPDATE_POST", payload: newPost });
    try {
      await putDataAPI(`post/${post._id}/like`, null, auth.token);
    } catch (error) {
      dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
    }
  };
export const unlikePost =
  ({ auth, post }) =>
  async (dispatch) => {
    console.log(post);
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };
    console.log({ newPost });
    dispatch({ type: "UPDATE_POST", payload: newPost });
    try {
      await putDataAPI(`post/${post._id}/unlike`, null, auth.token);
    } catch (error) {
      dispatch({
        type: "ALERT",
        payload: { error: error.response.data.msg },
      });
    }
  };
export const deletePost =
  ({ auth, post }) =>
  async (dispatch) => {
    console.log({ auth, post });
    dispatch({type:"DELETE_POST",payload:post})
    try {
      const res= await deleteDataAPI(`post/${post._id}`,auth.token);
      dispatch({type:"ALERT",payload:{success:res.data.msg}})
    } catch (error) {
      dispatch({
        type: "ALERT",
        payload: { error: error.response.data.msg },
      });
    }
  };
export const getPost =
  ({ PostDetails, auth, id }) =>
  async (dispatch) => {
    if(PostDetails.every(post=>post._id!==id)){
      try {
        const res=await getDataAPI(`post/${id}`,auth.token);
        dispatch({type:"GET_POST",payload:res.data.post})
      } catch (error) {
        dispatch({
          type: "ALERT",
          payload: { error: error.res.data.msg },
        });
      }
    }
  };
