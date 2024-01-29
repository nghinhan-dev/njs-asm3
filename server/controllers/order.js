const Order = require("../models/Orders");

exports.postOrder = async (req, res) => {
  const reqAddress = req.body.address;

  const newOrder = new Order({
    userID: req.user._id,
    address: reqAddress,
    items: req.user.cart.items,
    total: req.user.cart.totalPrice,
  });

  console.log(newOrder);

  await newOrder.save();

  res.status(200).send(newOrder);
};

exports.getOrders = async (req, res) => {
  const userID = req.user._id;

  try {
    const orderArr = await Order.find({ user: userID }).populate(
      "user",
      "-cart"
    );
    res.status(200).send(orderArr);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
