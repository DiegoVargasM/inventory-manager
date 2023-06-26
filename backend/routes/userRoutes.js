const express = require("express");
const router = express.Router();

//User registration route
router.post("/register", (req, res) => {
  res.json({ message: "User registration route" });
});

module.exports = router;
