import React from "react";
import UserPreview from "./UserPreview";
import Follow from "./Follow";
import { useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";

const FollowingCard = ({ following, setShowFollowing }) => {
  console.log(following);
  const { auth } = useSelector((state) => state);
  return (
    <div className="followers">
      <div className="followers-card">
          <h5 className="text-center">Following</h5>
        {following.length===0?<h5 className="text-center mt-5 text-dark">No following to show.</h5>:following.map((el) => (
          <UserPreview
            key={el._id}
            user={el}
          >
            {auth.user._id !== el._id && <Follow user={el} />}
          </UserPreview>
        ))}
        <div
          className="followers-close"
          onClick={() => setShowFollowing(false)}
        >
          <IoCloseSharp />
        </div>
      </div>
    </div>
  );
};

export default FollowingCard;
