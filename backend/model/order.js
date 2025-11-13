import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: Number,
  size: String,
  color: String,
  price: Number
});

// ---------------------- DELIVERY ADDRESS -----------------------
const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  street: { type: String, required: true },
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "India" }
});

// ---------------------- TRACKING SYSTEM ------------------------
const trackingEventSchema = new mongoose.Schema({
  status: { type: String, required: true },       // e.g. "Shipped", "In Transit"
  location: { type: String, required: true },     // e.g. "Hyderabad Hub"
  date: { type: String, required: true },         // readable format
});

// ---------------------- ORDER SCHEMA ---------------------------
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [orderItemSchema],

    totalAmount: Number,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    status: {
      type: String,
      enum: ["processing", "shipped", "in-transit", "delivered", "cancelled"],
      default: "processing"
    },

    deliveryAddress: {
      type: addressSchema,
      required: true
    },

    // 🔥 NEW: Tracking number for users to track order
    trackingNumber: {
      type: String,
      required: true,
      unique: true
    },

    // 🔥 NEW: Each update is added as event
    trackingHistory: [trackingEventSchema],

    // 🔥 NEW: Estimated delivery date
    estimatedDelivery: {
      type: String
    }

  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
