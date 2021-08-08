import React,{useState,useEffect} from 'react'
import CommentCard from './CommentCard'
const CommentList = ({ comment, post, replycom }) => {
    const [showReplies, setShowReplies] = useState([]);
    const [next, setNext] = useState(1);
    useEffect(() => {
      setShowReplies(replycom.slice(replycom.length - next));
    }, [replycom,next]);
  return (
    <div className="comment-list">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="ms-5">
          {showReplies.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}
          {replycom.length - next > 0 ? (
            <div
              className="expand-comments p-2 fw-bold"
              onClick={() => setNext(next + 10)}
            >
              See more
            </div>
          ) : (
            replycom.length > 1 && (
              <div
                className="expand-comments p-2 fw-bold"
                onClick={() => setNext(1)}
              >
                See less
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentList
