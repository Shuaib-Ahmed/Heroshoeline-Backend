const Items = require("../models/items");

const createItem = async (req, res) => {
  try {
    const data = req.body;

    const existData = await Items.find({ sku: data.sku });

    if (existData.length) {
      res.status(200).json({ error: true, message: "Dont Use Same SKU" });
      return;
    }

    const { _doc } = await Items.create({ ...data });

    res.status(200).json({
      error: false,
      message: "Successfully Created",
      responseData: { ..._doc },
    });
  } catch (error) {
    res.status(400).json({ error: true, message: "Something Went Wrong" });
  }
};

const getItem = async (req, res) => {
  try {
    const { limit, skip, article_number } = req.query;

    let responseData = [],
      total = 0,
      filter = {};

    // by article number
    if (article_number !== undefined) {
      filter = { ...filter, article_number: article_number };
    }

    responseData = await Items.find({ ...filter })
      .skip(skip)
      .limit(limit);
    total = await Items.count({ ...filter });

    res
      .status(200)
      .json({ error: false, message: "Successfull", responseData, total });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Somthing Went Wrong" });
  }
};

const getItmeById = async (req, res) => {
  try {
    const { productId } = req.params;

    const { _doc } = await Items.findById(productId);

    res.status(200).json({
      error: false,
      message: "Successfull",
      responseData: { ..._doc },
    });
  } catch (error) {
    res.status(400).json({ error: true, message: "Somthing Went Wrong" });
  }
};

const updateItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const existData = await Items.find({ sku: updateData.sku });

    if (existData.length > 0) {
      res
        .status(200)
        .json({ error: true, message: "Sku Already Exist Please Try New One" });
      return;
    }

    await Items.findByIdAndUpdate(productId, { ...updateData }, { new: true });

    res.status(200).json({ error: false, message: "Successfully Updated" });
  } catch (error) {
    res.status(400).json({ error: true, message: "Somthing Went Wrong" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { productId } = req.params;
    await Items.findByIdAndDelete(productId);

    res.status(200).json({ error: true, message: "Successfully Deleted" });
  } catch (error) {
    res.status(400).json({ error: true, message: "Somthing Went Wrong" });
  }
};

module.exports = { createItem, getItem, getItmeById, updateItem, deleteItem };
