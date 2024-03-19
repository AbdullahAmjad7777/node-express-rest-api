const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");

const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/Users", userRoute);
app.use("/api/v1/Products", productRoute);
app.use("/api/v1/Carts", cartRoute);
app.use("/api/v1/orders", orderRoute);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("conected to db");
  })
  .catch((e) => {
    console.log("cannot connect to db");
  });

app.get("/", (req, res) => {
  return res.send("welcome to ecomrence api");
});

app.listen(port, () => {
  console.log(`server is runnig ${port}`);
});
