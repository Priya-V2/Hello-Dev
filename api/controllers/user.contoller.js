import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    next(errorHandler(403, "You're not allowed to see all the users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const totalUsers = await User.countDocuments();

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { username, email, profilePicture } = await req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser.email !== email) {
    return next(errorHandler(409, "Existing username"));
  }

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You're not allowed to update the user"));
  }

  let hashedPassword;
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be atleast 6 characters"));
    }
    hashedPassword = bcryptjs.hashSync(req.body.password, 10);
  }

  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 to 20 characters")
      );
    }

    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }

    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }

    if (!username.match(/^[a-z0-9_]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updateFields = {
      username,
      email,
      profilePicture,
    };

    if (req.body.password) {
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateFields },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    console.log(rest)
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const updateBookmark = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (user.bookmarks.includes(postId)) {
      user.bookmarks = user.bookmarks.filter((bookmark) => bookmark !== postId);
    } else {
      user.bookmarks.push(postId);
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $set: { bookmarks: user.bookmarks },
      },
      { returnDocument: "after" }
    );

    res.status(200).json("Bookmark updated");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

const signoutUser = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out successfully");
  } catch (error) {
    next(error);
  }
};

export {
  getUsers,
  getUser,
  updateUser,
  updateBookmark,
  deleteUser,
  signoutUser,
};

/*

Search URL to Home

Signup - Signin with JWT

Signin - google

Home - about - topics

Home - explore posts - show more - search - postpage - home - topics

views - like - share - save - comment

profile - user - image - formdata - saved & liked post
 
responsiveness 

admin dashboard tour

create post - update post

code base tour

mongoDB database tour





 */
