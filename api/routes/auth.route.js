import express from "express";
import {
  signin,
  signup,
  googleLogin,
  googleCallback,
  googleRedirect,
  userProfile,
} from "../controllers/auth.controller.js";
import passport from "passport";

const router = express.Router();

// Sign-up and Sign-in routes
router.post("/sign-up", signup);
router.post("/sign-in", signin);

// Google OAuth routes
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback, googleRedirect);
router.get("/profile", userProfile);

export default router;
