const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewears/verfiyToken.middllewear");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts
} = require("../controllers/product.controller");

router.post("/createProduct", verifyTokenAndAdmin, createProduct);
router.put("/UpdateProduct", verifyTokenAndAdmin, updateProduct);
router.delete("/DeleteProduct", verifyTokenAndAdmin, deleteProduct);
router.get("/getProductById/:id",getProductById);
router.get("/getAllProducts",getAllProducts);


module.exports = router;
