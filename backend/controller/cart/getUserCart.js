import Cart from "../../model/cart.js";
import Product from "../../model/product.js";

export const getUserCart = async (req, res) => {
  try {
    // Ensure user exists in request (safety check)
    if (!req.user || !req.user._id) {
      console.error("Unauthorized: user not found in request", req.user);
      return res.status(401).json({
        error: true,
        message: "Unauthorized: user not found in request",
      });
    }

    const userId = req.user._id;

    // Fetch cart with products populated
    let cart = await Cart.findOne({ user: userId })
      .populate({
        path: "items.product",
        select: "name image sellingPrice", // limit fields to speed up
      })
      .exec();

    // Create empty cart if none exists
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const isEmpty = cart.items.length === 0;

    // Send response shaped exactly how frontend expects
    return res.status(200).json({
      cart,                      // frontend accesses cart.cart.items
      isEmpty,                   // frontend checks for empty cart
      totalCost: cart.getTotalCost(),
    });
  } catch (err) {
    console.error("❌ Get Cart Error:", err);

    return res.status(500).json({
      error: true,
      message: "Failed to fetch cart",
      details: err.message,
    });
  }
};
