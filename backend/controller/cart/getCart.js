import Cart from "../../model/cart.js";
import Product from "../../model/product.js";

/* Get User Cart */
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};