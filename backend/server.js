// Initialize dotenv
const dotenv = require("dotenv").config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import error handler middleware
const { errorHandler } = require("./middleware/errorMiddleware");

// Import routes
const userRoutes = require("./routes/userRoutes");

// Define app constants
const PORT = process.env.PORT;

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for routes
app.use("/api/users", userRoutes);

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
