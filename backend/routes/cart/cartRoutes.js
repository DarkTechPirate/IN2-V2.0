import express from "express";
import {
  addToCart,
  removeCartItem,
  clearCart, 
  updateCartItem, 
  getUserCart
} from "../../controller/cart/index.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware(), getUserCart);
router.post("/add", authMiddleware(), addToCart);
router.put("/update", authMiddleware(), updateCartItem);
router.delete("/:productId", authMiddleware(), removeCartItem);
router.delete("/clear", authMiddleware(), clearCart);

export default router;
