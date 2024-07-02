import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDb } from "./db/database.js";
import userRoute from "./routes/user.routes.js";
dotenv.config({
  path: "./.env",
});
connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
