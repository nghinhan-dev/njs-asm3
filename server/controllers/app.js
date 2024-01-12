const Product = require("../models/Products");

exports.getProducts = async (req, res) => {
  const prods = await Product.find({});

  res.status(200).send(prods);
};
