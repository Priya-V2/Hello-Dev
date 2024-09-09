import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import "./config/auth.config.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.listen("5000", () => {
  console.log("Server is listening to the port 5000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
