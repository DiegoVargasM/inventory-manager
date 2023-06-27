const express = require("express");
const router = express.Router();
// Import controllers
const { registerUser, loginUser } = require("../controllers/userControllers");

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

module.exports = router;
