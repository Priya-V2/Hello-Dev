import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getPosts,
  filterPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/get-posts", getPosts);
router.get("/filter-posts", filterPosts);
router.put("/update-post/:postId/:userId", verifyToken, updatePost);
router.delete("/delete-post/:postId/:userId", verifyToken, deletePost);

export default router;
