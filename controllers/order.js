const Order = require("../models/order");
const Items = require("../models/items");
const Cart = require("../models/cart");

const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { shipping_data } = req.body;

    let orderProductData = [];

    const cartData = await Cart.find({ user_id: userId });

    cartData.forEach(async ({ product_id, quantity }, index) => {
      const productData = await Items.find({ _id: product_id });
      const { stock } = productData[0];

      if (stock === 0) {
        console.log("Stock is zero");
      } else if (stock >= quantity) {
        await Order.create({
          shipping_data: shipping_data,
          product_data: { ...productData[0] },
          quantity: quantity,
          user_id: userId,
        });

        await Items.findOneAndUpdate(
          { _id: product_id },
          { stock: stock - quantity }
        );

        await Cart.findOneAndDelete({
          user_id: userId,
          product_id: product_id,
        });
      } else {
        await Order.create({
          shipping_data: shipping_data,
          product_data: { ...productData[0] },
          user_id: userId,
          quantity: stock,
        });

        await Items.findOneAndUpdate({ _id: product_id }, { stock: 0 });

        await Cart.findOneAndUpdate(
          {
            user_id: userId,
            product_id: product_id,
          },
          { quantity: quantity - stock }
        );
      }

      if (cartData.length - 1 === index) {
        res.status(200).json({
          error: false,
          message: "Order Successfully Created",
          responseData: orderProductData,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
};

const getOrder = async (req, res) => {
  const { userId } = req.user;
  const { limit, skip, status, admin } = req.query;

  let filter;

  if (admin === undefined) {
    filter = { user_id: userId };
  }

  try {
    const response = await Order.find({ status: status, ...filter })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Order.count({ ...filter, status: status });

    res.status(200).json({
      error: false,
      message: "Successfully Fetch",
      responseData: response,
      total: total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Somthing Went Wrong" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { order_id, status } = req.body;
    await Order.findOneAndUpdate({ _id: order_id }, { status: status });
    res.status(200).json({ error: false, message: "Successfuly Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Somthing Went Wrong" });
  }
};

module.exports = { createOrder, getOrder, updateOrder };
