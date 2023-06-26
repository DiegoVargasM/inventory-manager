const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

//Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters long");
    }

    if (password.length > 23) {
      res.status(400);
      throw new Error("Password must be at most 23 characters long");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Email already in use");
    }

    // Encrypt password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      const { _id, name, email, profilePicture, phone, bio } = user;
      //201 represents something was created
      res.status(201).json({
        _id,
        name,
        email,
        profilePicture,
        phone,
        bio,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(500);
    res.json({ error: error.message });
    return;
  }
};

module.exports = { registerUser };
