import { Router } from "express";
import { upload } from "../middleware/mulder.middleware.js";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { fictionalCharacterProfile } from "../controllers/character.profile.controller.js";

const router = Router();

// character creation Route
router.post(
  "/new",
  jwtVerify,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  fictionalCharacterProfile
);

export default router;
