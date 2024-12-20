import express from "express";
import { verifyToken } from "../utils/verifyUser";
import { updateSetting } from "../controllers/settings.controller";

const router = express.Router();

router.post("/updateSetting/:userId", verifyToken, updateSetting);

export default router;
