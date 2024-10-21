const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// @desc Register a user
// @route Post /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("All fields are mandatory");
  }
  const userAvailalbe = await User.findOne({ email });
  if (userAvailalbe) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash password
  const hasPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hasPassword,
  });
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login a user
// @route Post /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });
  //compare password with hashedpasword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

// @desc Current user info
// @route Post /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register the user" });
});

module.exports = { registerUser, loginUser, currentUser };
