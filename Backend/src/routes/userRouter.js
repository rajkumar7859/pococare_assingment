const express = require("express");
const { register, loginUser } = require("../controller/userAuth.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router()

router.post("/register" , register);
router.post("/login" ,authMiddleware , loginUser)

module.exports= router