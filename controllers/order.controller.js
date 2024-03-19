const orderModel = require("../models/order.model");

const createOrder = async (req, res) => {
  try {
    // Await the creation of the product
    const order = await orderModel.create(req.body);
    // Save the product
    const savedorder = await order.save();
    // Send a success response
    return res.status(201).json({
      message: "Product created successfully",
      savedorder,
    });
  } catch (error) {
    // Send an error response
    return res.status(500).json({ error: error.message });
  }
};



const updateOrder = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      messsage: "order updated succsesfully",
      order,
    });
  } catch (error) {
    return res.status(200).json(error);
  }
};




const deleteOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "order has been deleted",
    });
  } catch (error) {
    return res.status(200).json(error);
  }
};

const getorderById = async (req, res) => {
  try {
    const order = await orderModel.find({ user_id: req.params.id });
    return res.status(200).json({
      order,
    });
  } catch (error) {
    return res.status(200).json(error);
  }
};

const getAllOrder = async (req, res) => {
  try {
    order = await orderModel.find();
    return res.status(200).json({
      order,
    });
  } catch (error) {
    return res.status(200).json(error);
  }
};

const allIncome = async (req, res) => {
    try {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // Corrected typo
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); // Corrected typo
        
        const income = await orderModel.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                }
            },
            { 
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ]);
        
        res.json({ income }); // Sending income data as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" }); // Handling errors
    }
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getorderById,
  getAllOrder,
  allIncome 
};
