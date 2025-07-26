import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const signupUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.create({ email, username, password });
    const token = createToken(user._id);
    res.status(201).json({ token, user: { username, email } });
  } catch (err) {
    res.status(400).json({ error: "Email already used" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const token = createToken(user._id);
  res.json({ token, user: { username: user.username, email: user.email } });
};
