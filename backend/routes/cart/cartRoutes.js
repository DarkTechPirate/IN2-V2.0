import express from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../controller/cart/index.js";

const router = express.Router();

router.get("/", getCart);
router.post("/add",  addToCart);
router.put("/update", updateQuantity);
router.delete("/remove", removeFromCart);
router.delete("/clear", clearCart);

export default router;
