const Product = require("../models/productModel");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, sku, category, quantity, price, description } = req.body;
    //   Validation
    if (!name || !category || !quantity || !price || !description) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    // Manage image upload

    // Create product in DB
    const product = await Product.create({
      // this has access to the user object because of the protectMiddleware
      user: req.user._id,
      name,
      sku,
      category,
      quantity,
      price,
      description,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
};
