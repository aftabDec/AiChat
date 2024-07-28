// routes/authRoutes.js
import express from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js"; // Adjust the import based on your file structure

const router = express.Router();

router.get("/verify-token", jwtVerify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Use req.user from middleware

    if (!user) return res.status(404).json({ message: "User not found" });

    // Respond with user data
    res.json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
