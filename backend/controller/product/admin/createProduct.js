// /controllers/admin/productController.js
import Product from "../../../model/product.js";

import { fileToPublicPath } from "../../../middleware/uploadHandler.js";

/* CREATE PRODUCT */
export const createProduct = async (req, res) => {
  try {
    // Validate required fields
    const { name, description, category, costPrice, sellingPrice, sizes, colors } = req.body;

    const errors = [];
    if (!name || String(name).trim().length < 2) errors.push("Name is required (min 2 chars).");
    if (!description || String(description).trim().length < 5) errors.push("Description is required (min 5 chars).");
    if (!category) errors.push("Category is required.");
    if (costPrice === undefined || isNaN(Number(costPrice))) errors.push("costPrice must be a number.");
    if (sellingPrice === undefined || isNaN(Number(sellingPrice))) errors.push("sellingPrice must be a number.");

    if (errors.length) {
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }

    // Build product payload from body
    const payload = {
      name: String(name).trim(),
      description: String(description).trim(),
      category: String(category).trim(),
      costPrice: Number(costPrice),
      sellingPrice: Number(sellingPrice),
      sizes: sizes ? (Array.isArray(sizes) ? sizes : String(sizes).split(",").map((s) => s.trim()).filter(Boolean)) : [],
      colors: colors ? (Array.isArray(colors) ? colors : String(colors).split(",").map((c) => c.trim()).filter(Boolean)) : [],
    };

    // attach files if provided (req.files from uploadFields)
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        payload.image = fileToPublicPath(req.files.image[0]);
      }
      if (req.files.media && req.files.media.length) {
        payload.media = req.files.media.map((f) => fileToPublicPath(f));
      }
    }

    const product = await Product.create(payload);

    return res.status(201).json({ success: true, message: "Product created", product });
  } catch (error) {
    console.error("Create Product Error:", error);
    // Multer specific errors
    if (error instanceof Error && error.name === "MulterError") {
      return res.status(400).json({ success: false, message: "File upload error", error: error.message });
    }
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

