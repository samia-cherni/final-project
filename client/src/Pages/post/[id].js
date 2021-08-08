import React,{useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { getPost } from '../../actions/posts';
import Skeleton from '../../Components/Skeleton';
import PostCard from '../../Components/Post';

const Post = () => {
    const {id}=useParams();
    const [post,setPost]=useState([]);
    const { auth, PostDetails } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPost({ PostDetails, auth, id }));
      if (PostDetails.length > 0) {
        const newArr = PostDetails.filter((post) => post._id === id);
        setPost(newArr);
      }
    }, [PostDetails,auth,dispatch,id]);
    return (
        <div className="post-details mx-5 my-2">
            {
                post.length===0 && <Skeleton/>
            }
            {
                post.map(el=><PostCard key={el._id} post={el}/>)
            }
        </div>
    )
}

export default Post;
