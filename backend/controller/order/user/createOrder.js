import Cart from "../../../model/cart.js";
import Order from "../../../model/order.js";
import dayjs from "dayjs";

function generateTrackingNumber(userId) {
  return `TRK-${Date.now()}-${userId.toString().slice(-4)}`;
}

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;

    if (!address || !address.fullName || !address.phone || !address.street) {
      return res.status(400).json({ message: "Valid address is required" });
    }

    // Fetch user cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.getTotalCost();

    // -------------------------------
    // Generate tracking number
    // -------------------------------
    const trackingNumber = generateTrackingNumber(userId);

    // -------------------------------
    // Estimated Delivery (3–5 days)
    // -------------------------------
    const estimatedDelivery = dayjs().add(4, "day").format("MMM DD, YYYY");

    // -------------------------------
    // Initial Tracking Event
    // -------------------------------
    const initialTrackingEvent = {
      status: "Order Placed",
      location: "Processing Center",
      date: dayjs().format("MMM DD, YYYY - hh:mm A")
    };

    // -------------------------------
    // Create order
    // -------------------------------
    const order = await Order.create({
      user: userId,
      items: cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        size: i.size || null,
        color: i.color || null,
        price: i.product.sellingPrice
      })),
      totalAmount,
      paymentStatus: "paid",
      status: "processing",
      deliveryAddress: address,
      trackingNumber,
      trackingHistory: [initialTrackingEvent],
      estimatedDelivery
    });

    // Clear user cart
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    console.error("Order Error:", err);
    return res.status(500).json({ message: "Failed to create order" });
  }
};
