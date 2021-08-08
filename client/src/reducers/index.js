import { combineReducers } from "redux";
import auth from './auth';
import alert from './alert';
import theme from './theme';
import profile from "./profile";
import active from "./active";
import posts from "./posts";
import PostDetails from './details';
import discover from "./discover";
export default combineReducers({
  auth,
  alert,
  profile,
  active,
  posts,
  theme,
  PostDetails,
  discover,
});