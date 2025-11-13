import Product from "../../../model/product.js";

/**
 * GET /api/admin/products
 * Admin — list all products with optional search, category filter, and pagination
 */
export const getAdminProducts = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      page = 1,
      limit = 20,
    } = req.query;

    const filters = {};

    // 🔍 Search by name
    if (search) {
      filters.name = { $regex: search, $options: "i" };
    }

    // 🎯 Filter by category
    if (category) {
      filters.category = category;
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Fetch products with filters
    const products = await Product.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filters);

    return res.status(200).json({
      message: "Products fetched successfully",
      total,
      page: Number(page),
      limit: Number(limit),
      data: products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    return res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
