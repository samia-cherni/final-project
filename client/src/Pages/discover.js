import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getDiscoverPosts } from '../actions/discover';
import Skeleton from '../Components/Skeleton';
import PostPreview from '../Components/PostPreview';
import LoadMore from '../Components/LoadMore';
import { getDataAPI } from '../api';

const Discover = () => {
    const {auth,discover}=useSelector(state=>state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const handleLoadMore=async()=>{
        setLoad(true);
        const res = await getDataAPI(`discoverposts?limit=${discover.page * 3}`,auth.token);
        dispatch({type:"UPDATE_DISCOVER_POSTS",payload:res.data});
        setLoad(false);
    }
    useEffect(() => {
      if (!discover.firstLoad) {
        dispatch(getDiscoverPosts(auth.token));
      }
    }, [dispatch, auth.token, discover.firstLoad]);
    return (
      <div>
        {discover.loading === true ? (
          <Skeleton />
        ) : (
          <PostPreview
            userPosts={discover.posts}
            postNumber={discover.result}
          />
        )}
        {load && <Skeleton />}
        {!discover.loading && (
          <LoadMore
            result={discover.result}
            page={discover.page}
            load={load}
            handleLoadMore={handleLoadMore}
          />
        )}
      </div>
    );
}

export default Discover;
