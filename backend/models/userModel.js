const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Encrypt password before saving to database
// To avoid code repetition
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be at least 6 characters long"],
    },
    profilePicture: {
      type: String,
      required: [true, "Please enter your profile picture"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+51",
    },
    bio: {
      type: String,
      maxLength: [250, "Your bio must be at most 250 characters long"],
      default: "bio",
    },
  },
  { timestamps: true }
);

// we dont use arrow function because we need to use "this"
// controller sends normal password and with .pre, we encrypt it
// before saving it to the database
userSchema.pre("save", async function (next) {
  // If password is not modified, move on
  if (!this.isModified("password")) {
    return next();
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
