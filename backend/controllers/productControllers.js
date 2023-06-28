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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // Check if product exists
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Check if product belongs to the logged in user
    // .user is an ObjectId, so we need to convert it to a string
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // Check if product exists
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Check if product belongs to the logged in user
    // .user is an ObjectId, so we need to convert it to a string
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to delete this product");
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { name, category, quantity, price, description } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    // Check if product exists
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Check if product belongs to the logged in user
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to update this product");
    }

    // Handle image upload to cloudinary
    let fileData = {};
    // ONLY if there is a file in the request
    if (req.file) {
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Inventory_Manager_App",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Something went wrong with the image upload");
      }
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }

    // Update product in DB
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      // we dont update the sku
      {
        name,
        category,
        quantity,
        price,
        description,
        // in case there is no new image, keep the old one
        image: Object.keys(fileData).length === 0 ? product?.image : fileData,
      },
      // return the updated object and run validators
      { new: true, runValidators: true }
    );

    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exports
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
