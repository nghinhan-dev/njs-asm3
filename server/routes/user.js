const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const userValidate = require("../middleware/validate/userValidate");
const auth = require("../middleware/auth");

router.post("/signup", userValidate.signUpValidator(), userController.signUp);
router.post("/login", userValidate.loginValidator(), userController.login);
router.post("/logout", userController.logOut);
router.put("/cart", auth.login, userController.updateCart);
router.get("/cart", auth.login, userController.getCart);

module.exports = router;
