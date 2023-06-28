const Product = require("../models/productModel");

// Create a new product
const createProduct = async (req, res) => {
  res.send("Create product");
};

module.exports = {
  createProduct,
};
