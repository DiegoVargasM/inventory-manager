const express = require("express");
const router = express.Router();
// Import controllers
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
} = require("../controllers/userControllers");
// Import protection middleware
const protectMiddleware = require("../middleware/authMiddleware");

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/log-in", loginUser);

// User logout route
router.get("/log-out", logoutUser);

// Get user route (protected)
router.get("/get-user", protectMiddleware, getUser);

// Logged in user route
router.get("/logged-in", loginStatus);

// Update user profile route
router.patch("/update-user", protectMiddleware, updateUser);

module.exports = router;
