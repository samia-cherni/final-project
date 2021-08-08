import React,{useEffect} from 'react';
import UserInfo from '../../Components/UserInfo';
import UserPosts from '../../Components/UserPosts';
import { getProfileInfo } from "../../actions/profile";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Profile = () => {
   const { id } = useParams();
   const { auth, profile } = useSelector((state) => state);
   const dispatch = useDispatch();
   useEffect(() => {
     if (profile.ids.every((el) => el !== id)) {
       dispatch(getProfileInfo({ id, auth }));
     }
   }, [id, auth, dispatch, profile.ids]);
    return (
      <div className="profile">
        <UserInfo auth={auth} profile={profile} dispatch={dispatch} id={id} />
        <UserPosts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      </div>
    );
}

export default Profile;
