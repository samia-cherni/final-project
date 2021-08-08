import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { createPost,updatePost } from "../actions/posts";

const PostModal = () => {
  const { auth, active } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    image: "",
    description: "",
    tags: "",
  });
  const { title, image, description, tags } = postData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(active.onEdit){
      dispatch(updatePost({ postData, auth,active}));
    }else{
      dispatch(createPost({ postData, auth,active }));
    }
    setPostData({ title: "", image: "", description: "", tags: "" });
  };
  useEffect(() => {
    if (active.onEdit) {
      setPostData({
        title: active.title,
        image: active.image,
        description: active.description,
        tags: active.tags,
      });
    }
  }, [active]);
  return (
    <div className="post-modal">
      <form className="post-modal-form" onSubmit={handleSubmit}>
        <div className="post-modal-header">
          <h5 className="ms-1">{active.onEdit ? "Update" : "Create"} a post</h5>
          <span
            className="post-modal-close"
            onClick={() => dispatch({ type: "ACTIVE", payload: false })}
          >
            <IoCloseSharp className="post-modal-close-icon"/>
          </span>
        </div>

        <div className="post-modal-body">
          <input
            type="text"
            value={title}
            className="form-control mb-3"
            name="title"
            placeholder="Add a title..."
            onChange={handleChange}
          />
          <textarea
            type="text"
            value={description}
            className="form-control mb-3"
            name="description"
            placeholder="Add a description..."
            onChange={handleChange}
          />
          <input
            type="text"
            value={image}
            className="form-control mb-3"
            name="image"
            placeholder="Input your image URL.."
            onChange={handleChange}
          />
          <input
            type="text"
            value={tags}
            className="form-control mb-3"
            name="tags"
            placeholder="Add tags(comma seperated)"
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <button className="btn btn-default" type="submit">
            {active.onEdit ? "Update" : "Create"} Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostModal;
