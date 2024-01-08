const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  phoneNumber: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
