const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true },
    user_id: { type: String, required: true },
    article_number: {type: String, required: true},
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewSchema);
