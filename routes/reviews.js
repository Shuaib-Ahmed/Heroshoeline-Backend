const express = require("express");
const Routers = express.Router();

const checkAuth = require("../middleware/checkAuth")
const {createReview, getReview} = require("../controllers/reviews");

Routers.route("/query").get(getReview);
Routers.route("/").post( checkAuth, createReview);

module.exports = Routers;
