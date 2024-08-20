import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoD is connected"));

app.listen("5000", () => {
  console.log("Server is listening to the port 5000");
});
