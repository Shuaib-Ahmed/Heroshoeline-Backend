const GroupItems = require("../models/groupItems");
const Items = require("../models/items");

const getGroupItems = async (req, res) => {
  try {
    const { limit, skip, type, article, style_code, color } = req.query;
    let filter = {};

    if (type !== undefined && type != 'undefined') {
      filter = { ...filter, "card_data.type": type };
    }
    if (article !== undefined) {
      filter = { ...filter, article_number: article };
    }
    if (style_code !== undefined) {
      filter = { ...filter, style_code: style_code };
    }
    if(color !== undefined && color != 'undefined'){
      filter = { ...filter, "card_data.color": color}
    }

    const totalItem = await GroupItems.count({...filter});

    const responseData = await GroupItems.find({ ...filter })
      .sort({ total_rating: -1 })
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      error: false,
      message: "Successfully",
      responseData: responseData,
      totalItems: totalItem
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: true, message: "Something Went Wrong Try Again" });
  }
};

const createGroupItems = async (req, res) => {
  try {
    const data = req.body;
    const { article_number, product_ids } = data;

    const responseData = await GroupItems.find({
      article_number: article_number,
    });

    if (responseData.length === 0) {
      const { _doc } = await Items.findById(product_ids[0]);
      await GroupItems.create({ ...data, card_data: { ..._doc } });
    } else {
      const new_product_ids = responseData[0].product_ids.concat(product_ids);
      await GroupItems.findOneAndUpdate(
        { article_number: article_number },
        { product_ids: new_product_ids },
        { new: true }
      );
    }

    res.status(200).json({ error: false, message: "Successfully Grouped" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Something Went Wrong" });
  }
};

const updateGroupItems = async (req, res) => {
  try {
    const { product_id, article_number } = req.body;

    const responseData = await GroupItems.find({
      article_number: article_number,
    });

    const idArray = responseData[0].product_ids;

    if (idArray.length === 1) {
      await GroupItems.findOneAndDelete({ article_number: article_number });
    } else {
      const newIdArray = idArray.filter((item) => item !== product_id);
      await GroupItems.findOneAndUpdate(
        { article_number: article_number },
        { product_ids: newIdArray }
      );
    }

    res.status(200).json({ error: false, message: "Successfully Updated" });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: "Somthing Went Wrong Try Again" });
  }
};

module.exports = {
  createGroupItems,
  updateGroupItems,
  getGroupItems,
};
