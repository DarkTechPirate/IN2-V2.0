import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

/* 🔥 Method to calculate total cost */
cartSchema.methods.getTotalCost = function () {
  let total = 0;

  for (const item of this.items) {
    if (item.product?.sellingPrice) {
      total += item.quantity * item.product.sellingPrice;
    }
  }

  return total;
};

export default mongoose.model("Cart", cartSchema);
