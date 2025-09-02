import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./DB/db.js";

dotenv.config({
  origin: process.env.CORS_ORIGIN,
});

const app = express();
app.use(express.json({ limit: "100kb" }));
app.use(cors());
app.use(express.urlencoded());
app.use(express.static("Public"));
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () =>
      console.log(`🚀 Server Running at PORT \n  : http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Server failed to start.", error);
  }
};
startServer();
