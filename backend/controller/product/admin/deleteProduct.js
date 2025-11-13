import Product from "../../../model/product.js";
import mongoose from "mongoose";
import {  safeUnlink } from "../../../middleware/uploadHandler.js";
import path from "path";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/* DELETE PRODUCT */
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Remove stored files (if stored locally)
    try {
      if (product.image && product.image.startsWith("/uploads/products/")) {
        safeUnlink(path.join(process.cwd(), product.image));
      }
      if (Array.isArray(product.media) && product.media.length) {
        product.media.forEach((m) => {
          if (m && typeof m === "string" && m.startsWith("/uploads/products/")) {
            safeUnlink(path.join(process.cwd(), m));
          }
        });
      }
    } catch (e) {
      // log but do not fail deletion if file removal fails
      console.warn("Failed to delete product files:", e?.message || e);
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
