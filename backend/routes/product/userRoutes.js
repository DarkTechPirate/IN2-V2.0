import express from "express";
import { getUserProducts, getUserProductById } from "../../controller/product/index.js";

const router = express.Router();

router.get("/", getUserProducts);
router.get("/:id", getUserProductById);

export default router;
