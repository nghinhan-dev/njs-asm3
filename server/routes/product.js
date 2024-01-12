const express = require("express");
const router = express.Router();

const prdController = require("../controllers/product");

router.get("/", prdController.getProducts);
router.get("/:prdID", prdController.getDetail);

module.exports = router;
