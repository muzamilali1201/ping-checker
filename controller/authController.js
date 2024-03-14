const Auth = require("../model/Auth");
const customError = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  registerUser: async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await Auth.findOne({ email: email });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (existingUser) {
      throw new customError(409, "User already exists");
    }
    let newUser = await Auth.create({
      username,
      email,
      password: hashedPassword,
    });
    newUser = newUser.toObject();
    delete newUser.password;
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    let existingUser = await Auth.findOne({ email: email });
    if (!existingUser) {
      throw new customError(404, "User not found!");
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new customError(401, "Invalid credentials");
    }
    existingUser = existingUser.toObject();
    delete existingUser.password;
    const token = await jwt.sign(existingUser, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    res.status(200).json({
      success: true,
      message: "User login successfully!",
      data: existingUser,
      token: token,
    });
  },
};

module.exports = authController;
