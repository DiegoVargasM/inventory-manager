const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
// Import cloudinary
const cloudinary = require("cloudinary").v2;

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
      // upload the file to cloudinary
      let uploadedFile;
      try {
        //.upload (file path, options)
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Inventory_Manager_App",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Something went wrong with image upload");
      }
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
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

// Get all products
const getProducts = async (req, res) => {
  try {
    // Get all products that belong to the logged in user
    const products = await Product.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {}
};

module.exports = {
  createProduct,
  getProducts,
};
