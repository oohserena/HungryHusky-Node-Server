import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import TestRoutes from "./routes";

// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
mongoose.connect("xxx");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

TestRoutes(app);
app.listen(process.env.PORT || 4000);
