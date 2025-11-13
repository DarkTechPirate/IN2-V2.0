import Product from "../../../model/product.js";
import mongoose from "mongoose";
import { fileToPublicPath, safeUnlink } from "../../../middleware/uploadHandler.js";
import path from "path";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/* UPDATE PRODUCT */
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Allowed fields to update
    const allowed = [
      "name",
      "description",
      "category",
      "costPrice",
      "sellingPrice",
      "sizes",
      "colors",
      "soldCount",
    ];

    // apply body fields safely
    Object.keys(req.body || {}).forEach((key) => {
      if (allowed.includes(key)) {
        // convert numeric if necessary
        if (["costPrice", "sellingPrice", "soldCount"].includes(key)) {
          const num = Number(req.body[key]);
          if (!isNaN(num)) product[key] = num;
        } else if (key === "sizes" || key === "colors") {
          product[key] = Array.isArray(req.body[key])
            ? req.body[key]
            : String(req.body[key]).split(",").map((s) => s.trim()).filter(Boolean);
        } else {
          product[key] = req.body[key];
        }
      }
    });

    // Handle uploaded files (if any)
    // If a new main image is uploaded, remove previous file (if it was local)
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        // remove previous file if it was stored locally under uploads/products
        if (product.image && product.image.startsWith("/uploads/products/")) {
          const prevPath = path.join(process.cwd(), product.image);
          safeUnlink(prevPath);
        }
        product.image = fileToPublicPath(req.files.image[0]);
      }

      if (req.files.media && req.files.media.length) {
        // optionally remove old media (you can choose to concat instead)
        if (Array.isArray(product.media) && product.media.length) {
          // optionally remove each old media file
          product.media.forEach((m) => {
            if (typeof m === "string" && m.startsWith("/uploads/products/")) {
              safeUnlink(path.join(process.cwd(), m));
            }
          });
        }
        product.media = req.files.media.map((f) => fileToPublicPath(f));
      }
    }

    await product.save();

    return res.status(200).json({ success: true, message: "Product updated", product });
  } catch (error) {
    console.error("Update Product Error:", error);
    if (error instanceof Error && error.name === "MulterError") {
      return res.status(400).json({ success: false, message: "File upload error", error: error.message });
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
    }
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
