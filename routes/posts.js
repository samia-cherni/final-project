import express from 'express';
import auth from "../middlewares/auth.js";
import {
  createPost,
  getPosts,
  updatePost,
  likePost,
  unlikePost,
  getUserPosts,
  deletePost,
  getPost,
  getDiscoverPosts,
} from "../controllers/posts.js";
const router = express.Router();
router.post('/posts',auth,createPost);
router.get("/posts", auth, getPosts);
router.put("/post/:id", auth, updatePost);
router.delete("/post/:id", auth, deletePost);
router.get("/post/:id", auth, getPost);
router.put("/post/:id/like", auth, likePost);
router.put("/post/:id/unlike", auth, unlikePost);
router.get("/userposts/:id", auth, getUserPosts);
router.get("/discoverposts", auth, getDiscoverPosts);
export default router;