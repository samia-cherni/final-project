import React from 'react';
import { useSelector,useDispatch } from 'react-redux';

const CreatePost = ({auth}) => {
    const {theme}=useSelector(state=>state);
    const dispatch = useDispatch();
    return (
      <div className="create-post d-flex">
        <img
          className="create-post-avatar"
          src={auth.user.avatar}
          alt="create-post-avatar"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        />
        <button
          className="create-post-btn-hover  create-post-btn"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          onClick={() => dispatch({ type: "ACTIVE", payload: true })}
        >
          {auth.user.name}, what's on your mind?
        </button>
      </div>
    );
}

export default CreatePost
