import cartRoutes from "./cart/cartRoutes.js";
import authRoutes from "./user/authRoutes.js";
import productUserRoutes from "./product/userRoutes.js";
import productAdmminRoutes from "./product/adminRoutes.js";
import userRoutes from "./user/userRoutes.js";

import express from "express";
const router = express.Router();

router.use("/cart", cartRoutes);
router.use("/auth", authRoutes);
router.use("/product", productUserRoutes);
router.use("/admin/product", productAdmminRoutes);
router.use("/user", userRoutes);

export default router;