const express = require("express");
const router = express.Router();
const protectMiddleware = require("../middleware/authMiddleware");
const { contactUs } = require("../controllers/contactControllers");

// Create a new contact message
router.post("/", protectMiddleware, contactUs);

module.exports = router;
