const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewears/verfiyToken.middllewear");
const {
  UpdateUser,
  deleteUserById,
  getUserById,
  getAllUsers,
  getUserStatus,
} = require("../controllers/user.controller");

router.put("/UpdateUserById/:id", verifyTokenAndAuthorization, UpdateUser);
router.delete(
  "/deleteUserById/:id",
  verifyTokenAndAuthorization,
  deleteUserById
);
router.get("/getUserById/:id", verifyTokenAndAdmin, getUserById);
router.get("/getAllUser/", verifyTokenAndAdmin, getAllUsers);
router.get("/getUserStatus/", verifyTokenAndAdmin, getUserStatus);

module.exports = router;
