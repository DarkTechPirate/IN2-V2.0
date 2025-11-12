import express from "express";
import { emailLogin, emailSignup, googleAuth , refreshAccessToken } from "../../controller/user/auth/index.js";

const router = express.Router();

// Email Signup
router.post("/signup", emailSignup);

// Google Signup/Login
router.post("/google", googleAuth);

// Email Login
router.post("/login", emailLogin);

// Refresh Access Token
router.post("/refresh-token", refreshAccessToken);

router.post("/admin/login", emailLogin);

export default router;
