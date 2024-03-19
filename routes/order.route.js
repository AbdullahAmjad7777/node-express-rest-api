const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewears/verfiyToken.middllewear");

const {
    createOrder,
    updateOrder,
    deleteOrder,
    getorderById,
    getAllOrder,
    allIncome 
} = require("../controllers/order.controller");

router.post("/createOrder", verifyToken, createOrder);
router.put("/UpdateOrder", verifyTokenAndAdmin, updateOrder);
router.delete("/DeleteOrder", verifyTokenAndAdmin, deleteOrder);
router.get("/getOrderById/:user_id", verifyTokenAndAuthorization, getorderById);
router.get("/getAllOrder", verifyTokenAndAdmin, getAllOrder);
router.get("/getAllIncome", verifyTokenAndAdmin, allIncome);
module.exports = router;
