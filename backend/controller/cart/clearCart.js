import Cart from "../../model/cart.js";
import Product from "../../model/product.js";



/* 🟢 Clear Entire Cart */
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    return res.status(200).json({
      message: "Cart cleared",
      cart,
      totalCost: 0,
    });
  } catch (err) {
    console.error("Clear Cart Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

