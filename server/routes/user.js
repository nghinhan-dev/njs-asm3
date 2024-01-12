const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const userValidate = require("../middleware/validate/userValidate");

router.post("/signup", userValidate.signUpValidator(), userController.signUp);
router.post("/login", userValidate.loginValidator(), userController.login);
router.post("/logout", userController.logOut);

module.exports = router;
