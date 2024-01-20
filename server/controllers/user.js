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
          "Existed email, please use a different email or try logging in.",
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

    return res.status(201).send({ result: "Create sucessfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  if (req.session.isAuth) {
    return res.status(409).send({
      error: "Already logged in",
    });
  }

  const user = await User.find({ userName: userName });

  if (user.length === 0) {
    return res.status(404).send({
      error: "User not found",
      message: "Provided username doesn't exist",
    });
  }

  const isMatch = bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Incorrect password",
    });
  }

  req.session.userID = user[0]._id;
  req.session.isAuth = true;
  req.session.save();

  return res
    .status(200)
    .send({ statusText: "Login sucessfully", userName: user[0].userName });
};

exports.logOut = async (req, res) => {
  req.session.destroy();

  res.status(200).send("Log out");
};

exports.updateCart = async (req, res) => {
  let user = req.user;

  try {
    user.cart = req.body;

    user = await req.user.populate({
      path: "cart",
      populate: {
        path: "items",
        populate: {
          path: "item",
        },
      },
    });

    let { items, totalPrice } = user.cart;
    totalPrice = items.reduce((acc, itemDetail) => {
      let { item, quantity } = itemDetail;

      return acc + item.price * quantity;
    }, 0);

    user.cart = { ...req.body, totalPrice };
    await user.save();

    res.status(200).send(user.cart);
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await req.user.populate({
      path: "cart",
      populate: {
        path: "items",
        populate: {
          path: "item",
        },
      },
    });

    res.status(200).send(user.cart);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
