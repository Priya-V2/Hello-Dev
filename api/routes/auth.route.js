import express from "express";
import {
  signin,
  signup,
  googleLogin,
  googleCallback,
  checkAuth,
  forgotPassword,
  authEmail,
  resetPassword,
  checkOtp,
  checkSignupOtp,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Sign-up and Sign-in routes
router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/forgot-password", forgotPassword);
router.post("/auth-email", authEmail);
router.post("/check-signup-otp", checkSignupOtp);
router.post("/check-otp", checkOtp);
router.put("/reset-password", verifyToken, resetPassword);

// Google OAuth routes

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/check", checkAuth);

export default router;
