import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {
  AiOutlineClockCircle,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import moment from 'moment';
import CommentMenu from './CommentMenu';
import { updateComment,likeComment,unLikeComment } from '../actions/comments';
import InputComment from './InputComment';


const CommentCard = ({children, comment, post,commentId}) => {
    const {auth, theme} =useSelector(state=>state);
    const [content,setContent]=useState('');
    const [overflowText,setOverflowText]=useState(false);
    const [like, setLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [edit, setEdit] = useState(false);
    const [isReply, setIsReply]=useState(false);
    const dispatch = useDispatch();
    const handleLike = async () => {
      if(loadLike)return;
      setLike(true);

      setLoadLike(true);
      await dispatch(likeComment({comment,post,auth}));
      setLoadLike(false);
    };
    const handleUnlike = async () => {
      if (loadLike) return;
      setLike(false);

      setLoadLike(true);
      await dispatch(unLikeComment({ comment, post, auth }));
      setLoadLike(false);
    };
    const handleEdit=()=>{
      if(comment.contents!==content&&content!=="")
      {
        dispatch(updateComment({comment,post,content,auth}));
        setEdit(false);
      }else{
        setEdit(false);
        setContent(comment.contents)
      }
    };
    const handleReply=()=>{
      if(isReply)return setIsReply(false);
      setIsReply({...comment,commentId})
    }
    const handleShowMore=(e)=>{
        e.preventDefault();
        setOverflowText(!overflowText)
    }
    useEffect(() => {
      setLike(false);
      setIsReply(false);
      setContent(comment.contents);
      if (comment.likes.find((like) => like._id === auth.user._id)) {
        setLike(true);
      }
    }, [comment, auth.user._id]);
  return (
    <div
      className="comment-card my-3"
      style={{ opacity: comment._id ? "1" : "0.5" }}
    >
      <div className="d-flex">
        <img
          className="comment-avatar"
          src={comment.creator.avatar}
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          alt="comment-avatar"
        />
        <Link
          style={{ textDecoration: "none" }}
          to={`/profile/${comment.creator._id}`}
        >
          <h6 className="ms-2 my-2">{comment.creator.name}</h6>
        </Link>
      </div>
      <div className="comment-content">
        <div className="flex-md-fill">
          {edit ? (
            <textarea
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <>
              {comment.tag && comment.tag._id !== comment.creator._id && (
                <Link to={`/profile/${comment.tag._id}`} className="p-2">
                  @{comment.tag.name}:
                </Link>
              )}
              <span>
                {content.length < 150
                  ? content
                  : overflowText
                  ? `${content} `
                  : `${content.slice(0, 150)}...`}
              </span>
              {content.length > 150 && (
                <span className="show-more ms-2" onClick={handleShowMore}>
                  {overflowText ? "Show Less" : "Show More"}
                </span>
              )}
            </>
          )}
        </div>
        <div>
          <span>
            <AiOutlineClockCircle className="me-2" size="1.5rem" />
            {moment(comment.createdAt).fromNow()}
          </span>
          {like ? (
            <span>
              <AiFillHeart
                className="ms-2"
                size="2rem"
                color="red"
                onClick={handleUnlike}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
            </span>
          ) : (
            <span>
              <AiOutlineHeart
                className="ms-2"
                size="2rem"
                color="mediumorchid"
                onClick={handleLike}
              />
            </span>
          )}
          <span className="ms-2">
            {comment.likes.length}{" "}
            {comment.likes.length === 1 ? "Like" : "Likes"}
          </span>

          {edit ? (
            <>
              <span
                className="ms-2 fw-bold text-success comment-actions"
                onClick={handleEdit}
              >
                Update
              </span>
              <span
                className="ms-2 fw-bold text-danger comment-actions"
                onClick={() => setEdit(false)}
              >
                Cancel
              </span>
            </>
          ) : (
            <span
              className="ms-2 fw-bold comment-actions"
              onClick={handleReply}
            >
              {isReply ? "Cancel" : "Reply"}
            </span>
          )}
          <div>
            <CommentMenu
              post={post}
              comment={comment}
              setEdit={setEdit}
            />
          </div>
        </div>
      </div>
      {isReply && (
        <InputComment post={post} isReply={isReply} setIsReply={setIsReply}>
          <Link to={`/profile/${isReply.creator._id}`} className="p-2">
            @{isReply.creator.name}:
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard
