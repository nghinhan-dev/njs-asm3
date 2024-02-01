const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");
const auth = require("../middleware/auth");

router.post("/post", auth.login, orderController.postOrder);
router.get("/", auth.login, orderController.getOrders);
router.get("/:orderId", auth.login, orderController.getOrder);

module.exports = router;
