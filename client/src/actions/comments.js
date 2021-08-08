import * as API from "../api/index";
export const createComment = (newComment, post, auth) => async (dispatch) => {
const newPost={...post,comments:[...post.comments,newComment]}
dispatch({type:"UPDATE_POST",payload:newPost})
try {
    const data = { ...newComment, postId: post._id, postcreatorId:post.creator._id};
    const res= await API.postDataAPI('comment',data,auth.token);
    dispatch({ type: "ALERT" ,payload:{success:res.data.msg}});
    const newData = { ...res.data.comment, creator: auth.user };
    const newPost = { ...post, comments: [...post.comments, newData] };
    dispatch({ type: "UPDATE_POST", payload: newPost });
} catch (error) {
    dispatch({type:"ALERT",payload:{error:error.response.data.msg}})
}
};
export const updateComment =
  ({ comment, post, content, auth }) =>
  async (dispatch) => {
    // console.log({ comment, post, content, auth });
    const newComments=post.comments.map(el=>el._id===comment._id?{...comment,contents:content}:el);
    const newPost={...post,comments:newComments};
    dispatch({ type: "UPDATE_POST", payload: newPost });
    try {
      const res= await API.putDataAPI(`comment/${comment._id}`,{contents:content},auth.token);
       dispatch({ type: "ALERT", payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
    }
  };
export const likeComment = ({ comment, post, auth })=>async(dispatch)=>{
    const newComment={...comment,likes:[...comment.likes,auth.user]};
    // console.log({comment,newComment})
    const newComments = post.comments.map((el) =>
      el._id === comment._id ? newComment : el
    );
    const newPost = { ...post, comments: newComments };
    dispatch({ type: "UPDATE_POST", payload: newPost });
    try {
      await API.putDataAPI(`comment/${comment._id}/like`,null,auth.token)
    } catch (error) {
      dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
    }
  }
  export const unLikeComment =
    ({ comment, post, auth }) =>
    async (dispatch) => {
      const newComment = { ...comment, likes: comment.likes.filter(like=>like._id!==auth.user._id) };
      // console.log({ comment, newComment });
      const newComments = post.comments.map((el) =>
        el._id === comment._id ? newComment : el
      );
      const newPost = { ...post, comments: newComments };
      dispatch({ type: "UPDATE_POST", payload: newPost });
      try {
        await API.putDataAPI(`comment/${comment._id}/unlike`, null, auth.token);

      } catch (error) {
        dispatch({
          type: "ALERT",
          payload: { error: error.response.data.msg },
        });
      }
    };
    export const deleteComment = ({ post, auth, comment })=>async(dispatch)=>{
      const deleteArr=[...post.comments.filter(el=>el.reply===comment._id),comment];
      const newPost={
        ...post,
        comments:post.comments.filter(el=>!deleteArr.find(item=>item._id===el._id))
      }
      dispatch({type:"UPDATE_POST",payload:newPost});
      try {
        await deleteArr.forEach((el) => {
          API.deleteDataAPI(`comment/${el._id}/delete`, auth.token);
        });
      } catch (error) {
        dispatch({
          type: "ALERT",
          payload: { error: error.response.data.msg },
        });
      }
    };