const express = require("express");
const Router = express.Router();

const Order = require("../models/order");

Router.route("/query").get(async (req, res) => {
  try {
    const { date1, date2 } = req.query;
    const responseData = await Order.find({
      createdAt: { $gte: date1, $lt: date2 },
    });

    res
      .status(200)
      .json({ error: false, message: "sucessfully fetch", responseData });
  } catch (error) {
    res.status(400).json({ error: true, message: "Something Went Wrong" });
  }
});

module.exports = Router;
