import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import {
  getRecentChat,
  handleChat,
} from "../controllers/chat.message.controller.js";
const router = Router();

router.post("/chat", jwtVerify, handleChat);
router.get("/recent-conversations/:userId", jwtVerify, getRecentChat);
export default router;
