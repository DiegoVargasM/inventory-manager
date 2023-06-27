const express = require("express");
const router = express.Router();
// Import controllers
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/userControllers");
// Import protection middleware
const protectMiddleware = require("../middleware/authMiddleware");

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

// User logout route
router.get("/logout", logoutUser);

// Get user route (protected)
router.get("/getuser", protectMiddleware, getUser);

module.exports = router;
