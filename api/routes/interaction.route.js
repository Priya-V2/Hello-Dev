import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { 
    getMultiplePosts,
    updateBookmark, 
    updateLike, 
    deleteBookmark, 
    deleteLike, 
} from "../controllers/interaction.controller.js"; 
const router = express.Router();

router.get("/get-multiple-posts/:type/:userId", getMultiplePosts);
router.put("/update-bookmark/:postId/:userId", verifyToken, updateBookmark);
router.put("/update-like/:postId/:userId", verifyToken, updateLike);
router.delete("/delete-bookmark/:postId/:userId", verifyToken, deleteBookmark);
router.delete("/delete-like/:postId/:userId", verifyToken, deleteLike);

export default router;
