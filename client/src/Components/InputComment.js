import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { createComment } from '../actions/comments';


const InputComment = ({children,post,isReply,setIsReply}) => {
    const {auth}=useSelector(state=>state);
    const dispatch = useDispatch();
    const [contents, setContents] = useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!contents.trim()){
            if(setIsReply) return setIsReply(false);
            return;}
        const newComment={
            contents,
            likes:[],
            creator:auth.user,
            createdAt:new Date().toISOString(),
            reply:isReply&&isReply.commentId,
            tag:isReply&&isReply.creator,
        }
        dispatch(createComment(newComment,post,auth))
        setContents("");
        if (setIsReply) return setIsReply(false);
    }
    return (
        <form className="input-comment">
            {children}
            <input type="text" placeholder="Write a comment..."value={contents} onChange={(e)=>setContents(e.target.value)}/>
            <button className="input-comment-btn"type="submit" onClick={handleSubmit}>Comment</button>
        </form>
    )
}

export default InputComment
