const Order = require("../models/Orders");

exports.postOrder = async (req, res) => {
  const reqBody = req.body;

  const newOrder = new Order({
    userID: reqBody.userID,
    status: reqBody.status,
    delivery: reqBody.delivery,
    items: reqBody.items,
    total: reqBody.total,
  });

  await newOrder.save();

  res.status(200).send(newOrder);
};

exports.getOrders = async (req, res) => {
  const userID = req.params.userID;

  try {
    const orderArr = await Order.find({ userID: userID }).populate("items");
    res.status(200).send(orderArr);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
