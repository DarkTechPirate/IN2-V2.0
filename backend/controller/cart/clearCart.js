import Cart from "../../model/cart.js";
import Product from "../../model/product.js";


export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};