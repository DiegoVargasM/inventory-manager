const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//converts the data to json
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT;

//Connect to DB & start server

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
