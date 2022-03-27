const express = require("express");
const cros = require("cors");
require("dotenv").config();

const connectDB = require("./db/connectDB");

const checkAuth = require("./middleware/checkAuth");

const adminRouters = require("./routes/adminRoute");
const authRouters = require("./routes/auth");
const itemsRouters = require("./routes/items");
const groupItemsRouters = require("./routes/groupItems");
const cartRouters = require("./routes/cart");
const orderRouters = require("./routes/order");
const reviewRoutes = require("./routes/reviews");
const analyticsRoutes = require("./routes/analytics");

const app = express();
app.use(cros());
app.use(express.json());

app.use("/api/v1/adminRoute", adminRouters);
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/items", itemsRouters);
app.use("/api/v1/groupItems", groupItemsRouters);
app.use("/api/v1/cart", checkAuth, cartRouters);
app.use("/api/v1/order", checkAuth, orderRouters);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/analytics", analyticsRoutes);


app.get("/", (req, res) => {
  res.send("Server is running");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(process.env.PORT || 5000, () => {
      console.log("Sever is running on port 5000.....");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
