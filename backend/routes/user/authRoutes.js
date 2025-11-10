import express from "express";
import { emailSignup, googleSignup } from "../controllers/authController.js";

const router = express.Router();

// Email Signup
router.post("/signup", emailSignup);

// Google Signup/Login
router.post("/google", googleSignup);

export default router;
