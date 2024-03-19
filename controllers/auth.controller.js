const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;
    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: "User with this email already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Changed 5 to 10 for better security
    const savedUser = new userModel({
      user_name,
      email,
      password: hashedPassword,
    });
    await savedUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      savedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    const user = await userModel.findOne({ $or: [{ user_name }, { email }] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Here you might want to generate and send a JWT token for authentication
    const token = jwt.sign({ id: user._id ,is_admin:user.is_admin}, process.env.JWT_SEC, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { createUser, loginUser };
