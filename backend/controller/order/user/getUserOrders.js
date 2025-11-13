import Order from "../../../model/order.js";

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.product",
        select: "name image sellingPrice"
      });

    return res.status(200).json({ orders });
  } catch (err) {
    console.error("Get Orders Error:", err);
    return res.status(500).json({ message: "Failed to fetch order history" });
  }
};
