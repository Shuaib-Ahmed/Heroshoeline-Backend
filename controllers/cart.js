const Cart = require("../models/cart");

const addItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { product_id } = req.body;

    const existData = await Cart.find({
      user_id: userId,
      product_id: product_id,
    });

    let quantity = 1;

    const data = {
      user_id: userId,
      product_id: product_id,
      quantity: quantity,
    };

    if (existData.length > 0) {
      quantity += existData[0].quantity;
      await Cart.findOneAndUpdate(
        { user_id: userId, product_id: product_id },
        { ...data, quantity: quantity }
      );
    } else {
      await Cart.create({ ...data });
    }

    res.status(200).json({ error: false, message: "Successfully Added" });
  } catch (error) {
    res.status(400).json({ error: true, message: "Something Went Wromg" });
  }
};

const getItems = async (req, res) => {
  try {
    const { userId } = req.user;
    const cartData = await Cart.find({ user_id: userId });

    res.status(200).json({
      error: false,
      message: "Successfully Fetched",
      responseData: cartData,
    });
  } catch (error) {
    res.status(400).json({ error: true, message: "Something Went Wromg" });
  }
};

const getItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { product_id } = req.params;
    const cartData = await Cart.find({
      user_id: userId,
      product_id: product_id,
    });
    
    res.status(200).json({
      error: false,
      message: "Successfully Fetch",
      responseData: cartData[0],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Something Went Wrong" });
  }
};

const removeItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { product_id } = req.params;

    await Cart.findOneAndDelete({ user_id: userId, product_id: product_id });
    res.status(200).json({ error: false, message: "Successfully Removed" });
  } catch (error) {
    res.status(400).json({ error: true, message: "Something Went Wrong" });
  }
};

module.exports = { getItems, addItem, getItem, removeItem };
