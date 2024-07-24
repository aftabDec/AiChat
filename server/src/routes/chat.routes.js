import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { handleChat } from "../controllers/chat.message.controller.js";
const router = Router();

router.post("/chat", jwtVerify, handleChat);
export default router;
