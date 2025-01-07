import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getSetting,
  updateSetting,
} from "../controllers/settings.controller.js";

const router = express.Router();

router.get("/get-setting", getSetting);
router.patch("/update-setting/:userId", verifyToken, updateSetting);

export default router;
