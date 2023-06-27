const express = require("express");
const router = express.Router();
// Import controllers
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
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

// Logged in user route
router.get("/loggedin", loginStatus);

module.exports = router;
