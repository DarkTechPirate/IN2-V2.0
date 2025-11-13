import Cart from "../../model/cart.js";
import Product from "../../model/product.js";


/* 🟢 Update Item Quantity */
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size, color, quantity } = req.body;

    if (!productId || !size || !color) {
      return res.status(400).json({ message: "Product, size & color required" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) =>
        i.product.toString() === productId &&
        i.size === size &&
        i.color === color
    );

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const product = await Product.findById(productId);

    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available`
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      message: "Cart updated",
      cart,
      totalCost: cart.getTotalCost(),
    });
  } catch (err) {
    console.error("Update Cart Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
