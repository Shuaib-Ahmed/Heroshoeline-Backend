const express = require("express");
const Router = express.Router();

const {
  getGroupItems,
  createGroupItems,
  updateGroupItems,
} = require("../controllers/groupItems");

Router.route("/query").get(getGroupItems);
Router.route("/").post(createGroupItems).patch(updateGroupItems);

module.exports = Router;
