import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Post from './Post';
import { getDataAPI } from "../api";
import Skeleton from "./Skeleton";
import LoadMore from "./LoadMore";

const PostList = () => {
    const { posts,auth} = useSelector((state) => state);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const handleLoadMore = async () => {
       setLoad(true);
       const res = await getDataAPI(`posts?limit=${posts.page *3}`,auth.token);
       console.log(res)
       dispatch({ type: "GET_TIMELINE_POSTS", payload:{
           ...res.data, page:posts.page+1
       }});
       setLoad(false);
     };
    
    return (
      <div className="timeline-posts">
        {posts.timelineposts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
        {load && <Skeleton />}
        <LoadMore
          result={posts.results}
          page={posts.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      </div>
    );
}

export default PostList
