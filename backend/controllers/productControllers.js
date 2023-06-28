const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, sku, category, quantity, price, description } = req.body;
    //   Validation
    if (!name || !category || !quantity || !price || !description) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    // Handle image upload
    let fileData = {};
    // if there is a file in the request
    if (req.file) {
      fileData = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }

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
      image: fileData,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
};
