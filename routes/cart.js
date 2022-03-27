const express = require("express");
const Router = express.Router();

const {
  getItems,
  addItem,
  getItem,
  removeItem,
} = require("../controllers/cart");

Router.route("/").get(getItems).post(addItem);
Router.route("/:product_id").get(getItem).delete(removeItem);

module.exports = Router;
