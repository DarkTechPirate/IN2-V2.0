import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    min: 1,
    required: true,
    default: 1,
  },

  size: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
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

// METHOD — total cost of cart
cartSchema.methods.getTotalCost = function () {
  return this.items.reduce((sum, item) => {
    return sum + item.product.sellingPrice * item.quantity;
  }, 0);
};

export default mongoose.model("Cart", cartSchema);
