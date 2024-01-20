const User = require("../models/User");

exports.login = async (req, res, next) => {
  try {
    if (req.session.userID) {
      const user = await User.findById(req.session.userID);

      if (user) {
        req.user = user;
        return next();
      } else {
        res.status(404).send("User not found");
        throw new Error("User not found");
      }
    } else {
      res.status(409).send("Login first");
      throw new Error("Login first");
    }
  } catch (error) {
    console.error("Error in loginAuth:", error);
  }
};
