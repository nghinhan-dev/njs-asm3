const Product = require("../models/Products");

exports.getProducts = async (req, res) => {
  const prods = await Product.find({});

  res.status(200).send(prods);
};

exports.getDetail = async (req, res) => {
  const id = req.params.prdID;

  const product = await Product.findById(id);

  res.status(200).send(product);
};
