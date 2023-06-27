const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Generate token
const generateToken = (_id) => {
  //sign takes 3 parameters: payload, secret, options
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

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

    // Create User
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    // Send HTTP-only cookie to frontend
    res.cookie("token", token, {
      // where the cookie is stored
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      // last 2 execute on deploy:
      // none because we will be deploying on different domains
      sameSite: "none",
      // we are using https
      secure: true,
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
        token,
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

//Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email and password are provided
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Generate token
    const token = generateToken(user._id);

    // Send HTTP-only cookie to frontend
    res.cookie("token", token, {
      // where the cookie is stored
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      // last 2 execute on deploy:
      // none because we will be deploying on different domains
      sameSite: "none",
      // we are using https
      secure: true,
    });

    if (user && passwordMatch) {
      const { _id, name, email, profilePicture, phone, bio } = user;
      // 200 represents OK
      res.status(200).json({
        _id,
        name,
        email,
        profilePicture,
        phone,
        bio,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(500);
    res.json({ error: error.message });
  }
};

//Logout a user
const logoutUser = async (req, res) => {
  // Modify the cookie to remove the token
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // expire cookie
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logged out succesfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
