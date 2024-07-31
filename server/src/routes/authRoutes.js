// routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import { jwtVerify } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js"; // Adjust the import based on your file structure

const router = express.Router();

// Route to verify access token and refresh if needed
router.get("/verify-token", jwtVerify, async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ message: "Failed to authenticate refresh token" });
  }
});

export default router;
