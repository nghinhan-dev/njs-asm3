const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { userName, email, phoneNumber, password } = req.body;

  try {
    const user = await User.find({ email: email });

    if (user[0]) {
      return res.status(409).send({
        error: "Email already exists",
        message:
          "The email address provided is already in use. Please use a different email or try logging in.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .send({ statusText: "Create sucessfully", userName: userName });
  } catch (error) {
    console.log(error);
  }
};
