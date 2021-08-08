import React,{useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  AiOutlineClockCircle,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineMore,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { likePost,unlikePost,deletePost } from "../actions/posts";
import CommentSection from "./CommentSection";
import InputComment from "./InputComment";
import { useHistory } from "react-router-dom";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { auth, theme } = useSelector((state) => state);
  const [like, setLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const handleLike=async()=>{
    if(loadLike)return;
    setLike(true);
    setLoadLike(true);
    await dispatch(likePost({auth,post}));
    setLoadLike(false)
  }
   const handleUnlike = async() => {
     if (loadLike) return;
     setLike(false);
     setLoadLike(true);
     await dispatch(unlikePost({ auth, post }));
     setLoadLike(false);
   };
   const history=useHistory();
   const handleDeletePost=()=>{
     if(window.confirm("Are you sure you want to delete this post?")){
     dispatch(deletePost({post,auth}));
     history.push("/");
     }
   }
   useEffect(() => {
     if (post.likes.find((like) => like._id === auth.user._id)) {
       setLike(true);
     }
   }, [post.likes, auth.user._id]);
  const handleEdit = () => {
    console.log(post);
    dispatch({type:"ACTIVE",payload: {...post,onEdit:true}})
  };
  
  return (
    <div className="post-card">
      <div className="post-header m-3 p-2">
        <img
          className="timeline-post-avatar"
          src={post.creator.avatar}
          alt="timeline-avatar"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        />
        <div className="post-creator">
          <h6 className="ms-2">
            <Link
              style={{ textDecoration: "none" }}
              to={`/profile/${post.creator._id}`}
              className="text-dark"
            >
              {post.creator.name}
            </Link>
          </h6>
          <div className="text-muted ms-2">
            <span>
              <AiOutlineClockCircle size="1.5rem" />{" "}
              {moment(post.creationDate).fromNow()}
            </span>
          </div>
        </div>
        <div className="nav-item dropdown">
          <span className="nav-link" id="seeMore" data-bs-toggle="dropdown">
            <AiOutlineMore size="1.5rem" color="black" />
          </span>
          <div className="dropdown-menu">
            {auth.user._id === post.creator._id && (
              <>
                <div className="dropdown-item" onClick={handleEdit}>
                  <span>
                    <AiOutlineEdit /> Edit Post
                  </span>
                </div>
              </>
            )}
            {(auth.user._id === post.creator._id || auth.user.role === 1) && (
              <>
                <div className="dropdown-item" onClick={handleDeletePost}>
                  <span>
                    <AiOutlineDelete /> Delete Post
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="post-body m-3 p-2">
        <img
          src={post.image}
          className="post-image img-fluid"
          alt="post-img"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        />
        <div className="post-body-details">
          <span className="fw-bold">{post.title}</span>
          <p className="text-muted">{post.description}</p>
          <span className="text-muted">
            {post.tags.map((tag) => `#${tag} `)}
          </span>
        </div>
      </div>
      <div className="post-footer m-3 p-2">
        {like ? (
          <span>
            <AiFillHeart
              size="2rem"
              color="red"
              onClick={handleUnlike}
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
          </span>
        ) : (
          <span>
            <AiOutlineHeart
              size="2rem"
              color="mediumorchid"
              onClick={handleLike}
            />
          </span>
        )}

        <span>
          {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </span>
        <span className="mx-2">
          <AiOutlineComment
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            size="2rem"
            color="mediumorchid"
          />
        </span>
        <span>
          {post.comments.length}{" "}
          {post.comments.length === 1 ? "Comment" : "Comments"}
        </span>
        <InputComment post={post} />
        <CommentSection post={post} />
      </div>
    </div>
  );
};

export default Post;
