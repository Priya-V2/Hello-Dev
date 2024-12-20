import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "GLOBAL_SETTINGS",
    },
    predefinedTags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", settingsSchema);

export default Setting;
