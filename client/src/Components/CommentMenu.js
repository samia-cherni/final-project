import React from 'react';
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useSelector,useDispatch } from 'react-redux';
import { deleteComment } from '../actions/comments';

const CommentMenu = ({ post, comment, setEdit }) => {
    const {auth}=useSelector(state=>state);
    const dispatch = useDispatch();
    const handleDelete=()=>{
        dispatch(deleteComment({post,auth,comment}))
  }
  const dropdownItem = () => {
    return (
      <>
        <div className="dropdown-item" onClick={() => setEdit(true)}>
          <span>
            <AiOutlineEdit /> Edit comment
          </span>
        </div>
        <div className="dropdown-item" onClick={handleDelete}>
          <span>
            <AiOutlineDelete /> Delete comment
          </span>
        </div>
      </>
    );
  };
  return (
    <div className="comment-menu">
      {(post.creator._id === auth.user._id ||
        comment.creator._id === auth.user._id ||
        auth.user.role === 1) && (
        <div className="nav-item dropdown">
          <span className="nav-link" id="seeMore" data-bs-toggle="dropdown">
            <AiOutlineMore size="1.5rem" color="black" />
          </span>

          <div className="dropdown-menu">
            {post.creator._id === auth.user._id || auth.user.role === 1 ? (
              comment.creator._id === auth.user._id ? (
                dropdownItem()
              ) : (
                <div className="dropdown-item" onClick={handleDelete}>
                  <span>
                    <AiOutlineDelete /> Delete comment
                  </span>
                </div>
              )
            ) : (
              comment.creator._id === auth.user._id && dropdownItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu
