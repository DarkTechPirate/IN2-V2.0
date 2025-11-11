import express from "express";
import { emailLogin, emailSignup, googleAuth } from "../../controller/user/auth/index.js";

const router = express.Router();

// Email Signup
router.post("/signup", emailSignup);

// Google Signup/Login
router.post("/google", googleAuth);

// Email Login
router.post("/login", emailLogin);

export default router;
