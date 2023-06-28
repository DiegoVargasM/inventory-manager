const express = require("express");
const router = express.Router();
// Import controllers
const { createProduct } = require("../controllers/productControllers");
// Import protection middleware
const protectMiddleware = require("../middleware/authMiddleware");

// Create product route (protected)
router.post("/create-product", protectMiddleware, createProduct);

module.exports = router;
