import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineMail,AiOutlineDelete } from "react-icons/ai";
import EditProfile from "./EditProfile";
import Follow from "./Follow";
import { useSelector } from "react-redux";
import { deleteUser } from "../actions/profile";
import {useHistory} from 'react-router-dom';
import FollowerCard from "./FollowerCard";
import FollowingCard from "./FollowingCard";

const UserInfo = ({id,profile,dispatch,auth}) => {
  const { theme } = useSelector((state) => state);
  const [userInfo, setUserInfo] = useState([]);
  const [Edit, setEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  useEffect(() => {
    if (id === auth.user._id) {
      setUserInfo([auth.user]);
    }else{
        const newData=profile.users.filter(user=>user._id===id)
        setUserInfo(newData)
    }
  }, [id, auth,dispatch,profile.users]);
  const history=useHistory();
  const handleDelete=()=>{
    if(window.confirm("Are you sure you want to delete this profile?")){
    dispatch(deleteUser({ id, auth }));
    history.push('/');
    if(auth.user.role===0){
      localStorage.removeItem("firstLogin");
    }
    window.location.reload();
    }
  }
  return (
    <div className="info">
      {userInfo.map((user) => (
        <div className="user-info my-2" key={user._id}>
          <div className="d-flex" style={{ width: "16rem" }}>
            <img
              src={user.avatar}
              className="profile-img"
              alt="user-avatar"
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
          </div>
          <div className="user-info-card" style={{ width: "18rem" }}>
            <div className="user-info-header">
              <h5 className="user-info-title ms-3">{user.name}</h5>
            </div>
            <div className="card-body">
              <p>
                <AiOutlineMail className="me-2" size="1.5rem" /> {user.email}
              </p>
              <p>
                <span className="fw-bold me-2 user-info-text">Gender:</span>
                {user.gender}
              </p>
              <span
                className="follow me-2"
                onClick={() => setShowFollowers(true)}
              >
                {user.followers.length}{" "}
                {user.followers.length === 1 ? "follower" : "followers"}
              </span>
              <span
                className="follow ms-2"
                onClick={() => setShowFollowing(true)}
              >
                {user.following.length} following
              </span>
              <p>
                <span className="fw-bold me-2 user-info-text">Bio:</span>
                {user.about
                  ? user.about
                  : `${user.name} hasn't added a bio yet.`}
              </p>
            </div>
          </div>
          <div>
            {user._id === auth.user._id ? (
              <button
                onClick={() => setEdit(true)}
                className="btn m-2 btn-outline-secondary"
              >
                <AiOutlineEdit /> Edit Profile
              </button>
            ) : (
              <Follow user={user} />
            )}
            {(user._id === auth.user._id || auth.user.role === 1) && (
              <button
                className="m-2 btn btn-outline-danger"
                onClick={handleDelete}
              >
                <AiOutlineDelete /> Delete Profile
              </button>
            )}
          </div>
          {Edit && <EditProfile user={user} setEdit={setEdit} />}
          {showFollowers && (
            <FollowerCard
              followers={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <FollowingCard
              following={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
