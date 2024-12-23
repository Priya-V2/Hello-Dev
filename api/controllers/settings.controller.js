import Setting from "../models/settings.model.js";
import { errorHandler } from "../utils/error.js";

const getSetting = async (req, res, next) => {
  try {
    const setting = await Setting.findById("GLOBAL_SETTINGS");

    if (!setting) {
      return next(errorHandler(404, "Setting document not found"));
    }

    return res.status(200).json(setting);
  } catch (error) {
    return next(error);
  }
};

const updateSetting = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You're not allowed to access this records"));
  }

  try {
    const tag = req.body.tag;
    const setting = await Setting.findById("GLOBAL_SETTINGS");

    if (!setting) {
      const newSetting = await Setting.create({
        _id: "GLOBAL_SETTINGS",
        predefinedTags: [tag],
      });
      return res.status(200).json(newSetting);
    }

    if (setting.predefinedTags.includes(tag)) {
      return next(errorHandler(400, "Tag already exists"));
    }

    setting.predefinedTags.push(tag);
    await setting.save();

    return res.status(200).json(setting);
  } catch (error) {
    return next(error);
  }
};

export { getSetting, updateSetting };
