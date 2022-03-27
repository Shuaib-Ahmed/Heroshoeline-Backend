const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    shipping_data: {
      type: Object,
      required: true,
    },
    product_data: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["processing", "cancelled", "shipped", "deleverd"],
      default: "processing",
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
