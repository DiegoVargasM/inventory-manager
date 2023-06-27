const express = require("express");
const router = express.Router();
// Import controllers
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userControllers");

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

// User logout route
router.get("/logout", logoutUser);

module.exports = router;
