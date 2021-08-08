import express from "express";
import auth from "../middlewares/auth.js"
import { search, getUser, update,follow,unfollow,deleteUser } from "../controllers/users.js";
const router = express.Router();
router.get('/search',auth,search);
router.get("/user/:id", auth, getUser);
router.delete("/user/:id/delete", auth, deleteUser);
router.put("/user", auth, update);
router.put("/user/:id/follow", auth, follow);
router.put("/user/:id/unfollow", auth, unfollow);
export default router;