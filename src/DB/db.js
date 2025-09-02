import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connecton = await mongoose.connect(process.env.DB_URL);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("Connection Error", error.message);
    process.exit(1);
  }
};
