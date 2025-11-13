import Cart from "../../model/cart.js";
import Product from "../../model/product.js";


/* 🔴 Remove Single Item */
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const { size, color } = req.query;

    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) =>
        !(
          i.product._id.toString() === productId &&
          i.size === size &&
          i.color === color
        )
    );

    await cart.save();

    return res.status(200).json({
      message: "Item removed",
      cart,
      totalCost: cart.getTotalCost(),
    });
  } catch (err) {
    console.error("Remove Item Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
