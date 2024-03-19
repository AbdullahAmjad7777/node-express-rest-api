const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    products: [
      {
        product_id: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
