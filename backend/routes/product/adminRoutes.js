import express from "express";
import { createProduct, updateProduct, deleteProduct , getAdminProducts , getAdminProductById} from "../../controller/product/index.js";
import { createUploader } from "../../middleware/uploadHandler.js";


const router = express.Router();
const upload = createUploader("products");

router.post("/",upload.fields([
    { name: "image", maxCount: 1 },
    { name: "media", maxCount: 6 },
    ]), 
    createProduct
);

router.put("/:id",upload.fields([
    { name: "image", maxCount: 1 },
    { name: "media", maxCount: 6 },
    ]),     
    updateProduct
);

router.delete("/:id", deleteProduct);

router.get("/", getAdminProducts);

router.get("/:id", getAdminProductById);

export default router;
