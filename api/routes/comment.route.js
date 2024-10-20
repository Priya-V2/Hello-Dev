import express from "express";
import {
  createComment,
  getComment,
  likeComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/get-comment/:postId", getComment);
router.put("/like-comment/:commentId", verifyToken, likeComment);

export default router;
