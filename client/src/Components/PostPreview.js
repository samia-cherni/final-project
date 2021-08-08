import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {AiOutlineHeart} from 'react-icons/ai'

const PostPreview = ({userPosts,postNumber}) => {
    const {theme}=useSelector(state=>state);
    if(postNumber===0)return <h1 className="text-center fw-bold">No posts to show.</h1>
    return (
      <div className="post-preview">
        {userPosts.map((post) => (
          <Link key={post._id} to={`/post/${post._id}`}>
            <div className="post-preview-display">
              <img
                className="img-fluid"
                src={post.image}
                alt={post.image}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
              <div className="post-preview-info">
                <h3 className="text-center">{post.title}</h3>
                <p className="text-center">{post.description}</p>
                <span>
                  <AiOutlineHeart /> {post.likes.length}{" "}
                  {post.likes.length === 1 ? "Like" : "Likes"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
}

export default PostPreview
