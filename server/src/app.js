import express from "express";
import cors from "cors";
import cookie_parser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORSE_ORIGIN,
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

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/character", characterRouter);

export { app };
