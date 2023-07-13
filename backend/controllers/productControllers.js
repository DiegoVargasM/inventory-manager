const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  //   Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  // if there is a file in the request
  if (req.file) {
    // upload the file to cloudinary
    let uploadedFile;
    try {
      //.upload (file path, options)
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
      console.log(uploadedFile);
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url, // guardar la url de la imagen en cloudinary
      fileType: req.file.mimetype, //jpg, png, etc
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product in DB
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  // Get all products that belong to the logged in user
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

// Get one product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // Check if product exists
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Check if product belongs to the logged in user
  // .user is an ObjectId, so we need to convert it to a string
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // Check if product exists
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Check if product belongs to the logged in user
  // .user is an ObjectId, so we need to convert it to a string
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.deleteOne();
  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // Check if product exists
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Check if product belongs to the logged in user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle image upload to cloudinary
  let fileData = {};
  if (req.file) {
    // ONLY if there is a file in the request
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
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
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
