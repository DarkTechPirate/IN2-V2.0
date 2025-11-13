import Order from "../../../model/order.js";

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};
