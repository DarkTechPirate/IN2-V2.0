import Product from "../../../model/product.js";

/**
 * GET /api/products
 * Public — fetch all products with optional filters
 */
export const getUserProducts = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      minPrice = 0,
      maxPrice = 999999,
      sizes = "",
      colors = "",
    } = req.query;

    const filters = {};

    // 🔍 Search name + description
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 🎯 Category Filter
    if (category) filters.category = category;

    // 💰 Price Filter
    filters.sellingPrice = {
      $gte: Number(minPrice),
      $lte: Number(maxPrice),
    };

    // 👕 Sizes Filter
    if (sizes) {
      filters.sizes = { $in: sizes.split(",") };
    }

    // 🎨 Colors Filter
    if (colors) {
      filters.colors = { $in: colors.split(",") };
    }

    const products = await Product.find(filters).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Get User Products Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
