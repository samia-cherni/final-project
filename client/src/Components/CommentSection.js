import React,{useState,useEffect} from 'react';
import CommentList from './CommentList';

const CommentSection = ({post}) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState([]);
    const [next, setNext] = useState(1);
    const [replies, setReplies] = useState ([]); 
    useEffect(() => {
        const newcomments=post.comments.filter(el=>!el.reply);
        setComments(newcomments);
        setShowComments(newcomments.slice(newcomments.length-next));
    }, [post.comments,next])
    useEffect(() => {
      const newReply = post.comments.filter((el) => el.reply);
      setReplies(newReply);
    }, [post.comments]);
    return (
      <div className="comment-section">
        {showComments.map((comment, index) => (
          <CommentList key={index} comment={comment} post={post} replycom={replies.filter(el=>el.reply===comment._id)}/>
        ))}
        {comments.length - next > 0 ? (
          <div
            className="expand-comments p-2 fw-bold"
            onClick={() => setNext(next + 10)}
          >
            See more
          </div>
        ) : (
          comments.length > 1 && (
            <div
              className="expand-comments p-2 fw-bold"
              onClick={() => setNext(1)}
            >
              See less
            </div>
          )
        )}
      </div>
    );
}

export default CommentSection
