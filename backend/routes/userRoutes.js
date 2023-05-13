const express = require("express")
const UserController = require("../controllers/userController")

const router = express.Router()

router.post("/signin", UserController.signIn)

module.exports = router