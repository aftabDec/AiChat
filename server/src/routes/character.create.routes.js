import { Router } from "express";
import { upload } from "../middleware/mulder.middleware.js";
import { jwtVerify } from "../middleware/auth.middleware.js";
import {
  changeCharacterAvatar,
  fictionalCharacterProfile,
} from "../controllers/character.profile.controller.js";

const router = Router();

// character creation Route
router.post(
  "/new",
  jwtVerify,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  fictionalCharacterProfile
);
// Route for updating character avatar
router.post(
  "/change/avatar",
  jwtVerify, // JWT authentication middleware
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  changeCharacterAvatar // Controller function to handle avatar update
  // Multer file upload middleware
);

export default router;
