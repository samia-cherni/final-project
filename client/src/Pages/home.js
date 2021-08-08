import React from 'react'
import CreatePost from '../Components/CreatePost';
import PostList from '../Components/PostList';
import Skeleton from '../Components/Skeleton';
import {useSelector} from 'react-redux';
const Home = () => {
  const {posts,auth}=useSelector(state=>state)
    return (
      <div className="home row mx-1">
        <div className="col-md-8 my-3">
          <CreatePost auth={auth} />
          {posts.loading ? (
            <Skeleton />
          ) : posts.result === 0 ? (
            <h1 className="text-center">No posts to show.</h1>
          ) : (
            <PostList />
          )}
        </div>
        <div className="col-md-4 my-3"></div>
      </div>
    );
}

export default Home;
