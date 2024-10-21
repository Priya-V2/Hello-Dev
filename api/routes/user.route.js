import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  signoutUser,
  updateUser,
} from "../controllers/user.contoller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get-users/:userId", verifyToken, getUsers);
router.get("/get-User/:userId", getUser);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signoutUser);

export default router;
