const productModel = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    // Await the creation of the product
    const product = await productModel.create(req.body);
    // Save the product
    const savedProduct = await product.save();
    // Send a success response
    return res.status(201).json({
      message: "Product created successfully",
      savedProduct,
    });
  } catch (error) {
    // Send an error response
    return res.status(500).json({ error: error.message });
  }
};


const updateProduct = async(req,res)=>{
  try {
    const product = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json({
      messsage:"product updated succsesfully",
      product
    })
  } catch (error) {
    return res.status(200).json(error)
  }
}

const deleteProduct = async(req,res)=>{
  try {
    await productModel.findByIdAndDelete(req.params.id)
    return res.status(200).json({
      message:"product has been deleted"
    })
  } catch (error) {
    return res.status(200).json(error)
  }
}


const getProductById = async(req,res)=>{
  try {
    const product = await productModel.findById(req.params.id);
    return res.status(200).json({
      product
    })
  } catch (error) {
    return res.status(200).json(error)
  }
}


const getAllProducts = async(req,res)=>{
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    if(qNew){
      products = await productModel.find().sort({createdAt:-1}).limit(1);
    }else if(qCategory){
      products = await productModel.find({
        categories:{
          $in:[qCategory],
        },
      });
    }else{
      products = await productModel.find();
    }
    return res.status(200).json({
      products
    })
  } catch (error) {
    return res.status(200).json(error)
  }
}


module.exports = { createProduct ,updateProduct,deleteProduct,getProductById,getAllProducts};
