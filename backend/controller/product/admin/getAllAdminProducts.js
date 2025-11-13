import Product from "../../../model/product.js";

/**
 * GET /api/admin/products/all
 * Returns ALL products (admin only)
 */
export const getAllAdminProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All products fetched successfully",
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Get All Products Error:", error);
    return res.status(500).json({
      message: "Failed to fetch all products",
      error: error.message,
    });
  }
};
