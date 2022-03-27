const moongose = require("mongoose");

const groupItemSchema = new moongose.Schema({
  article_number: {
    type: String,
    required: true,
  },
  style_code: {
    type: String,
    required: true,
  },
  product_ids: {
    type: Array,
    required: true,
  },
  card_data: {
    type: Object,
    required: true,
  },
  average_rating: {
    type: Number,
    default: 0.0,
  },
  total_rating: {
    type: Number,
    default: 0.0,
  },
});

module.exports = moongose.model("GroupItems", groupItemSchema);
