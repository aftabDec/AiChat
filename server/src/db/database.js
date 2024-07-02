import mongoose from "mongoose";
import { db_name } from "../constants.js";
import "dotenv/config";

const connectDb = async () => {
  const mongoUrl = process.env.DATABASE_URL;
  const connectionString = `${mongoUrl}/${db_name}`;

  try {
    const connection_to_db = await mongoose.connect(connectionString);
    console.log(`MongoDB connected: ${connection_to_db.connection.host}`);
  } catch (error) {
    console.error("database connection failed", error);
    process.exit(1);
  }
};
export { connectDb };
