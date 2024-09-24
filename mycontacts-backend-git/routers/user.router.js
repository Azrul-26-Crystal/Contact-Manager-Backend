const { Router } = require("express");
const {registerUser,loginUser,currentUser} = require("../controllers/user.controller")
const validateToken = require("../middleware/validateTokenHandler")

const router = Router()


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken,currentUser)

module.exports = router