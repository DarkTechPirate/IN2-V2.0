import { getUserProfile , updateUserProfile } from "../../controller/user/index.js";
import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Get User Profile
router.get("/profile", authMiddleware ,getUserProfile);
// Update User by ID
router.put("/profile/update", authMiddleware ,updateUserProfile);

export default router;


