import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";


export const getMultiplePosts = async (req, res, next) => {
  const { type, userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (type === "bookmark") {
      const postIdArr = user.bookmarks;

      if (!postIdArr) {
        return next(errorHandler(400, "No postId is provided"));
      }

      const posts = await Post.find({ _id: { $in: postIdArr } });

      return res.status(200).json(posts);
    }

    if (type === "like") {
      const postIdArr = user.likes;

      if (!postIdArr) {
        return next(errorHandler(400, "No postId is provided"));
      }

      const posts = await Post.find({ _id: { $in: postIdArr } });

      return res.status(200).json(posts);
    }
  } catch (error) {
    next(error);
  }
};

export const updateBookmark = async (req, res, next) => {
    try {
      const { postId, userId } = req.params;
      const user = await User.findById(userId);
      const post = await Post.findById(postId);
  
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
  
      if (!post) {
        return next(errorHandler(404, "Post not found"));
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

export const updateLike = async (req, res, next) => {
    const { postId, userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      const post = await Post.findById(postId);
  
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
  
      if (!post) {
        return next(errorHandler(404, "Post not found"));
      }
  
      if (user.likes.includes(postId)) {
        user.likes = user.likes.filter((like) => like !== postId);
        post.likedBy = post.likedBy.filter((like) => like.toString() !== userId);
      } else {
        user.likes.push(postId);
        post.likedBy.push(userId);
      }
  
      await User.findByIdAndUpdate(
        userId,
        { $set: { likes: user.likes } },
        { new: true }
      );
      await Post.findByIdAndUpdate(
        postId,
        { $set: { likedBy: post.likedBy } },
        { new: true }
      );
  
      res.status(200).json({ userLikes: user.likes, postLikes: post.likedBy });
    } catch (error) {
      next(error);
    }
  };

export const deleteBookmark = async (req, res, next) => {
    try {
      const { postId, userId } = req.params;
      const user = await User.findById(userId);
      const post = await Post.findById(postId);
  
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
  
      if (user.bookmarks.includes(postId)) {
        user.bookmarks = user.bookmarks.filter((bookmark) => bookmark !== postId);
        user.save();
      }
  
      const postIdArr = user.bookmarks;
      const posts = await Post.find({ _id: { $in: postIdArr } });
  
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };
  
export const deleteLike = async (req, res, next) => {
    try {
      const { postId, userId } = req.params;
      const user = await User.findById(userId);
      const post = await Post.findById(postId);
  
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
  
      if (user.likes.includes(postId)) {
        user.likes = user.likes.filter((like) => like !== postId);
        user.save();
      }
  
      const postIdArr = user.likes;
      const posts = await Post.find({ _id: { $in: postIdArr } });
  
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

