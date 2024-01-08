const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const userValidate = require("../middleware/validate/userValidate");

router.post("/signup", userValidate.signUpValidator(), userController.signUp);

module.exports = router;
