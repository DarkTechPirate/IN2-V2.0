import Order from "../../../model/order.js";

export const updateOrderStatus = async (req, res) => {
  try {
    const { tracking } = req.params;
    const { status, location } = req.body;

    const order = await Order.findOne({ trackingNumber: tracking });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;

    order.trackingHistory.unshift({
      status,
      location,
      date: new Date().toLocaleString(),
    });

    await order.save();

    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
