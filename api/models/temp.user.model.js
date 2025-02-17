import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
    },
    otpCreatedAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  { timestamps: true }
);

const TempUser = mongoose.model("TempUser", tempUserSchema);
export default TempUser;
