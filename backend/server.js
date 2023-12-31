// Initialize dotenv
const dotenv = require("dotenv").config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// work with file paths and directories
const path = require("path");

// Import error handler middleware
const { errorHandler } = require("./middleware/errorMiddleware");

// Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Define app constants
const PORT = process.env.PORT;

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    // we are allowing cookies(c:true) to be sent with cross-origin requests
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
// Define uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routes Middleware
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact-us", contactRoutes);

//Route
app.get("/", (req, res) => {
  res.send({ message: "API Working" });
});

// Error handler middleware
app.use(errorHandler);

// Connect to DB & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
