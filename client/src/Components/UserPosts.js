import React,{useState,useEffect} from 'react';
import PostPreview from './PostPreview';
import { getDataAPI } from '../api';
import Skeleton from './Skeleton';
import LoadMore from './LoadMore';

const UserPosts = ({ id, profile, dispatch, auth }) => {
    const [userPosts, setUserPosts] = useState([]);
    const [postNumber, setPostNumber] = useState(6);
    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(false);
    useEffect(() => {
       profile.posts.forEach(el=>{if(el._id===id){
           setUserPosts(el.posts)
           setPostNumber(el.result)
           setPage(el.page)
       }})
    }, [profile.posts,id])
    console.log(userPosts);
    const handleLoadMore=async()=>{
        setLoad(true)
        const res = await getDataAPI(`userposts/${id}?limit=${page * 3}`,auth.token);
        const newData={...res.data,page:page+1,_id:id}
        dispatch({type:"UPDATE_PROFILE_POSTS",payload:newData})
        setLoad(false)
    }
    
  return (
    <div className="user-posts">
      <PostPreview userPosts={userPosts} postNumber={postNumber} />
      {load && <Skeleton />}

      <LoadMore
        result={postNumber}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default UserPosts
