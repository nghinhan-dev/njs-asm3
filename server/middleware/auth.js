const User = require("../models/User");

exports.login = async (req, res, next) => {
  try {
    if (req.session.userID) {
      const user = await User.findById(req.session.userID);

      if (user) {
        req.user = user;
        return next();
      } else {
        res.status(404).send({ statusText: "User not found" });
      }
    } else {
      res.status(409).send({ statusText: "Login first" });
    }
  } catch (error) {
    console.error("Error in loginAuth:", error);
  }
};
