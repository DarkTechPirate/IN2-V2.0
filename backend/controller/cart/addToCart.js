import Cart from "../../model/cart.js";
import Product from "../../model/product.js";

/* 🟢 Add Item to Cart */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1, size, color } = req.body;

    if (!productId)
      return res.status(400).json({ message: "Product ID is required" });

    if (!size || !color)
      return res.status(400).json({ message: "Size and color are required" });

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Stock check
    if (product.stock < quantity)
      return res.status(400).json({
        message: `Only ${product.stock} items left in stock`,
      });

    // Ensure size exists
    if (!product.sizes.includes(size)) {
      return res.status(400).json({ message: "Invalid size selected" });
    }

    // Ensure color exists
    if (!product.colors.includes(color)) {
      return res.status(400).json({ message: "Invalid color selected" });
    }

    let cart = await Cart.findOne({ user: userId });

    // Create new cart if doesn't exist
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity,
            size,
            color,
          },
        ],
      });
    } else {
      // Check if same product with same variation exists
      const existingItem = cart.items.find(
        (i) =>
          i.product.toString() === productId &&
          i.size === size &&
          i.color === color
      );

      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        if (newQty > product.stock) {
          return res.status(400).json({
            message: `Only ${product.stock} items available in stock`,
          });
        }
        existingItem.quantity = newQty;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          size,
          color,
        });
      }
    }

    await cart.save();
    await cart.populate("items.product");

    return res.status(201).json({
      message: "Item added to cart",
      cart,
      totalCost: cart.getTotalCost(),
    });
  } catch (err) {
    console.error("Add To Cart Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
