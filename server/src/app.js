import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookie_parser from "cookie-parser";

const app = express();
dotenv.config({
  path: "./.env",
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookie_parser());

// routes import
import userRouter from "./routes/user.routes.js";
import characterRouter from "./routes/character.create.routes.js";
import chatRouter from "./routes/chat.routes.js";
import authRoutes from "./routes/authRoutes.js";

// routes declaration
app.use("/auth", authRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", chatRouter);
app.use("/api/v1/character", characterRouter);

export { app };

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run() {
//   const chatSession = model.startChat({
//     generationConfig,
//     // safetySettings: Adjust safety settings
//     // See https://ai.google.dev/gemini-api/docs/safety-settings
//     history: [],
//   });

//   const result = await chatSession.sendMessage("how many planets are there in our solar system");
//   console.log(result.response.text());
// }

// run();
