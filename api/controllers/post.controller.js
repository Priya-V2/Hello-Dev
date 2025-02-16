import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You're not allowed to create a post"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all fields"));
  }

  const slug = req.body.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .join("-");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { slug, postId } = req.query;

    if (slug || postId) {
      const post = await Post.findOneAndUpdate(
        slug ? { slug } : { _id: postId },
        { $inc: { views: 1 } },
        { new: true }
      );

      if (!post) return next(errorHandler(404, "Post not found"));

      return res.status(200).json({ posts: [post] });
    }
  } catch (error) {
    next(error);
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const popularPosts = await Post.find().sort({ views: -1 }).limit(5);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    const totalViewsResult = await Post.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);
    const totalViews = totalViewsResult[0]?.totalViews || 0;

    const lastMonthViewsResult = await Post.aggregate([
      { $match: { createdAt: { $gte: oneMonthAgo } } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);
    const lastMonthViews = lastMonthViewsResult[0]?.totalViews || 0;

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
      totalViews,
      lastMonthViews,
      popularPosts,
    });
  } catch (error) {
    next(error);
  }
};

const getMultiplePosts = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const postIdArr = user.bookmarks;

    if (!postIdArr) {
      return next(errorHandler(400, "No postId is provided"));
    }

    const posts = await Post.find({ _id: { $in: postIdArr } });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const filterPosts = async (req, res, next) => {
  try {
    const selectedTagsStr = req.query.selectedTags || [];
    let filteredPost = [];

    const selectedTagsArr = Array.isArray(selectedTagsStr)
      ? selectedTagsStr
      : selectedTagsStr?.split(",").filter((tag) => tag.trim() !== "") || [];

    if (selectedTagsArr.length > 0) {
      filteredPost = await Post.find({ tags: { $all: selectedTagsArr } });
    }

    res.status(200).json({ filteredPost });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You're not allowed to update this post"));
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          image: req.body.image,
          content: req.body.content,
          slug: req.body.slug,
          tags: req.body.tags,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

const deleteBookmark = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    const user = await User.findById(userId);

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

// const likePost = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.postId);

//     if (!post) {
//       return next(errorHandler(404, "Post not found"));
//     }
//     const userId = req.user.id;

//     const liked = post.likedBy.includes(userId);

//     if (liked) {
//       post.likedBy = post.likedBy.filter((id) => id !== userId);
//       post.likes -= 1;
//     } else {
//       post.likedBy.push(userId);
//       post.likes += 1;
//     }

//     await post.save();

//     res.status(200).json({
//       message: liked ? "Post unliked successfully" : "Post liked successfully",
//       post,
//       liked,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const updateLike = async (req, res, next) => {
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

export {
  create,
  getPosts,
  getMultiplePosts,
  filterPosts,
  updatePost,
  updateLike,
  deletePost,
  deleteBookmark,
};
