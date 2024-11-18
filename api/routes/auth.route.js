import express from "express";
import {
  signin,
  signup,
  googleLogin,
  googleCallback,
  checkAuth,
  forgotPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Sign-up and Sign-in routes
router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/forgot-password", forgotPassword);

// Google OAuth routes

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/check", checkAuth);

export default router;
