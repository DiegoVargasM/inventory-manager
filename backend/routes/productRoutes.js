const express = require("express");
const router = express.Router();
// Import controllers
const { createProduct } = require("../controllers/productControllers");
// Import protection middleware
const protectMiddleware = require("../middleware/authMiddleware");
// Import file upload middleware
const { upload } = require("../utils/fileUpload");

// Create product route (protected) and use the upload middleware
router.post(
  "/create-product",
  protectMiddleware,
  upload.single("image"),
  createProduct
);

module.exports = router;
