import express from "express";
import {
  signin,
  signup,
  googleLogin,
  googleCallback,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Sign-up and Sign-in routes
router.post("/sign-up", signup);
router.post("/sign-in", signin);

// Google OAuth routes

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/check", checkAuth);

export default router;
