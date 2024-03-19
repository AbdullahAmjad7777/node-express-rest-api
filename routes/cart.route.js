const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewears/verfiyToken.middllewear");

const {
  createCart,
  updateCart,
  deleteCart,
  getCartById,
  getAllCarts,
} = require("../controllers/cart.controller");

router.post("/createCart", verifyToken, createCart);
router.put("/UpdateCart", verifyTokenAndAuthorization, updateCart);
router.delete("/DeleteCart", verifyTokenAndAuthorization, deleteCart);
router.get("/getCartById/:user_id", verifyTokenAndAuthorization, getCartById);
router.get("/getAllCart", verifyTokenAndAdmin, getAllCarts);
module.exports = router;
