const express = require("express");
const Routes = express.Router();

const checkAuth = require("../middleware/checkAuth");

Routes.route("/").post(checkAuth, async (req, res) => {
  try {
    return res.status(200).json({
      error: false,
      message: "Check For Admin Property",
      responseData: { isAdmin: req.user.isAdmin },
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: "Something Went Wrong Plaese Try Again" });
  }
});

module.exports = Routes;
