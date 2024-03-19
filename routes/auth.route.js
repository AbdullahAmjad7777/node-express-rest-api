const router = require("express").Router();
const {createUser,loginUser} = require("../controllers/auth.controller")

router.post("/Registration",createUser)
router.post("/Login",loginUser)

module.exports = router