const express = require("express");
const router = express.Router();
// Import controllers
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productControllers");
// Import protection middleware
const protectMiddleware = require("../middleware/authMiddleware");
// Import file upload middleware
const { upload } = require("../utils/fileUpload");

// Create product (protected and use the upload middleware)
router.post("/", protectMiddleware, upload.single("image"), createProduct);

// Get all products
router.get("/", protectMiddleware, getProducts);

// Get one product
router.get("/:id", protectMiddleware, getProduct);

// Delete a product
router.delete("/:id", protectMiddleware, deleteProduct);

// Update a product
router.patch("/:id", protectMiddleware, upload.single("image"), updateProduct);

// export
module.exports = router;
