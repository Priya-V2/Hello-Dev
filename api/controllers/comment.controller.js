import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (req.user.id !== userId) {
      next(
        errorHandler(
          403,
          "You're not allowed to create this comment. Kindly signin!"
        )
      );
    }

    const newComment = new Comment({ content, postId, userId });

    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export { createComment };
