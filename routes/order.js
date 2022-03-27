const express = require("express");
const Router = express.Router();

const { createOrder, getOrder, updateOrder } = require("../controllers/order");

Router.route("/").post(createOrder).patch(updateOrder);
Router.route("/query").get(getOrder);

module.exports = Router;