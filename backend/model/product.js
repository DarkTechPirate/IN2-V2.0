import mongoose from "mongoose";

const monthlySalesSchema = new mongoose.Schema({
  month: { type: String }, // '2024-07'
  units: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },

    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },

    // Automatically calculated using pre-save middleware
    profitMargin: { type: Number, default: 0 },

    sizes: [{ type: String }],
    colors: [{ type: String }],

    image: { type: String }, // Thumbnail / Main
    media: [{ type: String }], // additional images

    soldCount: { type: Number, default: 0 },

    monthlySales: [monthlySalesSchema],
  },
  { timestamps: true }
);

// Auto-calc Profit Margin
productSchema.pre("save", function (next) {
  if (this.costPrice && this.sellingPrice) {
    this.profitMargin = ((this.sellingPrice - this.costPrice) / this.costPrice) * 100;
  }
  next();
});

export default mongoose.model("Product", productSchema);
