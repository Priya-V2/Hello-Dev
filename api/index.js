import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import settingsRoutes from "./routes/settings.route.js";
import commentRoutes from "./routes/comment.route.js";
import interactionRoutes from "./routes/interaction.route.js";
import "./config/auth.config.js";
import cookieParser from "cookie-parser";
import path from "path";

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

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://hello-dev.onrender.com"
        : "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/interaction", interactionRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

const __dirname = path.resolve();

const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening to the port ${port}`);
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
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
