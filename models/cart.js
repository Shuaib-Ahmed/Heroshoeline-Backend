const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    quantity: {
      default: 1,
      type: Number,
    },
    product_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
