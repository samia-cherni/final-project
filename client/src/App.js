import React,{useEffect} from "react";
import {Route} from 'react-router-dom';
import Pagination from "./customRouter/Pagination";
import PrivateRouter from "./customRouter/PrivateRouter";
import Login from './Pages/login';
import Register from './Pages/register';
import Notification from "./Components/Notification";
import PostModal from "./Components/PostModal";
import Navigation from "./Components/Navigation";
import Home from "./Pages/home";
import { useSelector,useDispatch } from "react-redux";
import { refreshToken } from "./actions/auth";
import { getPosts } from "./actions/posts"
function App() {
 const {auth,active} = useSelector(state => state)
 const dispatch = useDispatch()
 useEffect(() => {
   dispatch(refreshToken())
 }, [dispatch])
 useEffect(() => {
   if (auth.token) dispatch(getPosts(auth.token));
 }, [dispatch, auth.token]);
  return (
    <>
      <Notification />
      <input type="checkbox" id="theme" />
      <div className="app">
        {auth.token && <Navigation />}
        {active && <PostModal />}
        <Route exact path="/" component={auth.token ? Home : Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRouter exact path="/:page" component={Pagination} />
        <PrivateRouter exact path="/:page/:id" component={Pagination} />
      </div>
    </>
  );
}

export default App;
