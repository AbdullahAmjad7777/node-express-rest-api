const cartModel = require("../models/cart.model");

const createCart = async (req, res) => {
  try {
    // Await the creation of the product
    const cart = await cartModel.create(req.body);
    // Save the product
    const savedcart = await cart.save();
    // Send a success response
    return res.status(201).json({
      message: "Product created successfully",
      savedcart,
    });
  } catch (error) {
    // Send an error response
    return res.status(500).json({ error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await cartModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      messsage: "product updated succsesfully",
      cart,
    });
  } catch (error) {
    return res.status(200).json(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    await cartModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Cart has been deleted",
    });
  } catch (error) {
    return res.status(200).json(error);
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await cartModel.findOne({ user_id: req.params.id });
    return res.status(200).json({
      cart,
    });
  } catch (error) {
    return res.status(200).json(error);
  }
};

const getAllCarts = async (req, res) => {
  try {
    cart = await cartModel.find();
    return res.status(200).json({
      cart,
    });
  } catch (error) {
    return res.status(200).json(error);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCartById,
  getAllCarts,
};
