const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userID: String,
  status: String,
  delivery: String,
  items: [
    {
      type: mongoose.ObjectId,
      ref: "Product",
    },
  ],
  total: Number,
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
