import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { createOrder } from "../../controller/order/user/createOrder.js";
import { mockPayment } from "../../controller/payment/mockPayment.js";
import { getUserOrders } from "../../controller/order/user/getOrders.js";
import { 
    getOrderByTracking,
    updateOrderStatus,} from "../../controller/order/user/index.js";

const router = express.Router();

router.post("/pay", authMiddleware(), mockPayment);
router.post("/create", authMiddleware(), createOrder);
router.get("/my", authMiddleware(), getUserOrders);
router.get("/track/:tracking", getOrderByTracking);
router.patch("/update/:tracking", authMiddleware(true), updateOrderStatus); 

export default router;
