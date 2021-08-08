import express from "express";
import auth from "../middlewares/auth.js";
import {
  createComment,
  updateComment,
  likeComment,
  unLikeComment,
  deleteComment
} from "../controllers/comments.js";
const router = express.Router();
router.post('/comment',auth,createComment);
router.put("/comment/:id", auth, updateComment);
router.put("/comment/:id/like", auth, likeComment);
router.put("/comment/:id/unlike", auth, unLikeComment);
router.delete("/comment/:id/delete", auth, deleteComment);
export default router;
