import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { follow, unFollow } from "../actions/profile";
const Follow = ({user}) => {
    const [following, setFollowing] = useState(false);
    console.log(following)
    const {auth,profile}=useSelector(state=>state);
    const dispatch = useDispatch();
    const handleUnFollow=()=> {setFollowing(false);
    dispatch(unFollow({ users: profile.users, user, auth }));};
    const handleFollow = () => {setFollowing(true);
    dispatch(follow({users:profile.users,user,auth}))};
    useEffect(() => {
      if (auth.user.following.find((el) => el._id === user._id))
        setFollowing(true);
    }, [auth.user.following, user._id,dispatch]);
    return (
      <div>
        {following ? (
          <button
            className="m-2 btn btn-outline-secondary"
            onClick={handleUnFollow}
          >
            <AiOutlineUserDelete size="1.5rem" />
            Unfollow
          </button>
        ) : (
          <button className="m-2 btn btn-outline-secondary" onClick={handleFollow}>
            <AiOutlineUserAdd size="1.5rem" />
            Follow
          </button>
        )}
      </div>
    );
}

export default Follow
