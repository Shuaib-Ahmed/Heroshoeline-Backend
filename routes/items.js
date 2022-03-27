const express = require("express");
const Router = express.Router();

const {
  createItem,
  getItem,
  getItmeById,
  updateItem,
  deleteItem,
} = require("../controllers/items");

Router.route("/").post(createItem);
Router.route("/query").get(getItem);
Router.route("/:productId")
  .get(getItmeById)
  .patch(updateItem)
  .delete(deleteItem);

module.exports = Router;
