const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate token
const generateToken = (_id) => {
  //sign takes 3 parameters: payload, secret, options
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register a new user
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

// Login a user
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
    res.status(500).json({ error: error.message });
  }
};

// Logout a user
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

// Get user data
const getUser = async (req, res) => {
  //we have access to req.user because of the protect middleware
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const { _id, name, email, profilePicture, phone, bio } = user;
      res.status(200).json({
        _id,
        name,
        email,
        profilePicture,
        phone,
        bio,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get loggin status
const loginStatus = async (req, res) => {
  try {
    // Check if token exists
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }
    // If exists, verify it
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      return res.json(true);
    }
    return res.json(false);
  } catch (error) {
    res.json(false);
  }
};

// Update user data
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const { _id, name, email, profilePicture, phone, bio } = user;
      // email is not updatable
      user.email = email;
      // other fields are updatable
      user.name = req.body.name || name;
      user.profilePicture = req.body.profilePicture || profilePicture;
      user.phone = req.body.phone || phone;
      user.bio = req.body.bio || bio;

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update user password
const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // we are expecting the current password &
    //the new password from the frontend
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!user) {
      res.status(404);
      throw new Error("User not found, please login again");
    }

    if (!currentPassword || !newPassword) {
      res.status(400);
      throw new Error("Please add your current password and the new password");
    }

    // Check if currentPassword match DB password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      res.status(400);
      throw new Error("Current password is incorrect");
    }

    if (user && passwordMatch) {
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  updatePassword,
};
