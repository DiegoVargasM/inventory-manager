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
  updatePassword,
  sendForgotPasswordEmail,
  resetPassword,
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

// Update user profile route (protected)
router.patch("/update-user", protectMiddleware, updateUser);

// Update user password route (protected)
router.patch("/update-password", protectMiddleware, updatePassword);

// Send forgot password email route
router.post("/forgot-password", sendForgotPasswordEmail);

// Reset password route (after clicking on link in email, not protected)
router.put("/reset-password/:resetToken", resetPassword);

// Export router
module.exports = router;
