const User = require("../models/User");

exports.login = async (req, res, next) => {
  try {
    if (req.session.user) {
      const user = await User.findById(req.session.user._id);

      if (user) {
        req.user = user;
        return next();
      } else {
        throw new Error("User not found");
      }
    } else {
      throw new Error("Login first");
    }
  } catch (error) {
    console.error("Error in loginAuth:", error);
    res.status(500).send("Internal Server Error");
  }
};
