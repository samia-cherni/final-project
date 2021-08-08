import { postDataAPI } from "../api/index";
import validator from '../utils/validator'
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ALERT", payload: { loading: true } });
    const res = await postDataAPI("login", data);
    dispatch({
        type: "AUTH",
        payload: { token: res.data.accessToken, user: res.data.user },
    });
    localStorage.setItem("firstLogin", true);
    dispatch({ type: "ALERT", payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
  }
};
export const refreshToken=()=>async(dispatch)=>{
  const firstLogin=localStorage.getItem("firstLogin");
  if(firstLogin){
    dispatch({type:"ALERT",payload:{loading:true}})
    try {
      const res = await postDataAPI("refresh");
      dispatch({
        type: "AUTH",
        payload: { token: res.data.accessToken, user: res.data.user },
      });
      dispatch({ type: "ALERT", payload: {} });
    } catch (error) {
      dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
    }
  }
}
export const register=(data)=>async(dispatch)=>{
  try {
    const check=validator(data);
    console.log(check);
    if(check.errLength>0) return dispatch({ type: "ALERT", payload: check.errMsg});
    dispatch({ type: "ALERT", payload: { loading: true } });
    const res = await postDataAPI("register", data);
    console.log(res);
    dispatch({
      type: "AUTH",
      payload: { token: res.data.accessToken, user: res.data.user },
    });
    localStorage.setItem("firstLogin", true);
    dispatch({ type: "ALERT", payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
  }
}
export const logout =()=>async(dispatch)=>{
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("logout");
    window.location.href="/"
  } catch (error) {
    dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
  }
}