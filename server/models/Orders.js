const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userID: String,
  status: String,
  delivery: String,
  items: [
    {
      default: [],
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  total: Number,
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
