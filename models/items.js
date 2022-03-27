const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    article_number: {
      type: String,
      required: true,
    },
    style_code: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    list_price: {
      type: Number,
      required: true,
    },
    image_url_1: {
      type: String,
      required: true,
    },
    image_url_2: {
      type: String,
    },
    image_url_3: {
      type: String,
    },
    image_url_4: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Items", itemSchema);
