const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//protect routes
const protectMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // get user without password
    const user = await User.findById(verified._id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = protectMiddleware;
