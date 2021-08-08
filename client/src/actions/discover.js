import * as API from '../api';

export const getDiscoverPosts=(token)=>async(dispatch)=>{
    try {
        dispatch({type:"DISCOVER_LOADING",payload:true});
        const res = await API.getDataAPI("discoverposts", token);
        console.log(res);
        dispatch({ type: "GET_DISCOVER_POSTS", payload: res.data });
        dispatch({ type: "DISCOVER_LOADING", payload: false });
    } catch (error) {
        dispatch({
          type: "ALERT",
          payload: { error: error.response.data.msg },
        });
    }
}