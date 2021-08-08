import { getDataAPI,putDataAPI,deleteDataAPI} from "../api/index";
export const getProfileInfo=({id,auth})=>async(dispatch)=>{
    dispatch({type:"GET_IDS",payload:id})
    try {
            dispatch({type:"LOADING",payload:true});
            const res = await getDataAPI(`user/${id}`,auth.token);
            const res_posts = await getDataAPI(`userposts/${id}`, auth.token);
            console.log(res)
            console.log(res_posts);
            const users=await res;
            const posts=await res_posts;
            dispatch({ type: "GET_USER", payload: users.data });
            dispatch({
              type: "GET_PROFILE_POSTS",
              payload: { ...posts.data, _id: id, page: 2 },
            });
            dispatch({ type: "LOADING", payload: false });
        }
     catch (error) {
        dispatch({
          type: "ALERT",
          payload: { error: error.response.data.msg },
        });
    }
}
export const updateUserProfile=({updateData,auth})=>async(dispatch)=>{
 if(!updateData.name)
 return dispatch({type:"ALERT",payload:{error:"Please Enter your full name"}})
     if (updateData.about.length > 300)
       return dispatch({
         type: "ALERT",
         payload: { error: "Your bio should contain 300 characters or less" },
       });
     try {
        const res= await putDataAPI("user", 
            {...updateData},auth.token
         );
         dispatch({type:"AUTH", payload: {
                ...auth,
                user: {
                    ...auth.user, ...updateData,
                }}})
       dispatch({ type: "ALERT", payload: { success: res.data.msg } });
     } catch (error) {
         dispatch({
           type: "ALERT",
           payload: { error: error.response.data.msg },
         });
     }
}
export const follow=({users,user,auth})=>async(dispatch)=>{
  let newFollower={...user,followers:[...user.followers,auth.user]};
  dispatch({ type: "FOLLOW", payload: newFollower });
  dispatch({
    type: "AUTH",
    payload: {...auth, user:{ ...auth.user, following: [...auth.user.following, newFollower] }},
  });
  try {
    await putDataAPI(`user/${user._id}/follow`,null,auth.token)
  } catch (error) {
     dispatch({
       type: "ALERT",
       payload: { error: error.response.data.msg },
     });
  }
}
export const unFollow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let User = { ...user, followers:user.followers.filter(el=>el._id !== auth.user._id )};
    console.log(User)
    dispatch({ type: "UNFOLLOW", payload: User });
    dispatch({
      type: "AUTH",
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: auth.user.following.filter(el=>el._id!==User._id),
        },
      },
    });
    try {
      await putDataAPI(`user/${user._id}/unfollow`, null, auth.token);
    } catch (error) {
      dispatch({
        type: "ALERT",
        payload: { error: error.response.data.msg },
      });
    }
  };
  export const deleteUser =
    ({ id,auth }) =>
    async (dispatch) => {
      console.log({ id, auth });
      dispatch({ type: "DELETE_USER", payload: id });
      try {
        const res=await deleteDataAPI(`user/${id}/delete`, auth.token);
        dispatch({ type: "ALERT", payload: { success: res.data.msg } });
      } catch (error) {
        dispatch({
          type: "ALERT",
          payload: { error: error.response.data.msg },
        });
      }
    };