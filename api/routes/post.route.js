import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getPosts,
  getMultiplePosts,
  filterPosts,
  updatePost,
  updateLike,
  deletePost,
  deleteBookmark,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/get-posts", getPosts);
router.get("/get-multiple-posts/:userId", getMultiplePosts);
router.get("/filter-posts", filterPosts);
router.put("/update-post/:postId/:userId", verifyToken, updatePost);
router.put("/update-like/:postId/:userId", verifyToken, updateLike);
router.delete("/delete-post/:postId/:userId", verifyToken, deletePost);
router.delete("/delete-bookmark/:postId/:userId", verifyToken, deleteBookmark);

export default router;
