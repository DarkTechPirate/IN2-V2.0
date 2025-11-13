import Order from "../../../model/order.js";

export const getOrderByTracking = async (req, res) => {
  try {
    const { tracking } = req.params;

    const order = await Order.findOne({ trackingNumber: tracking })
      .populate({
        path: "items.product",
        model: "Product",
        select: "name image media sellingPrice category description"
      });

    if (!order) {
      return res.status(404).json({ message: "Invalid tracking number" });
    }

    return res.status(200).json({ order });
  } catch (err) {
    console.error("Tracking Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
