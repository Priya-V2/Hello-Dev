import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCommentError(data.message);
      } else {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/get-Comment/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/like-comment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="font-roboto text-sm max-w-2xl w-full mx-auto">
      {currentUser ? (
        <div className="flex gap-2 my-5">
          <p className="text-gray-500">Signed in as : </p>
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="w-5 h-5 rounded-full"
          />
          <Link to={"/dashboard?tab=profile"}>
            <p className="text-cool-blue hover:underline hover:cursor-pointer">
              {currentUser.username}
            </p>
          </Link>
        </div>
      ) : (
        <div className="max-w-2xl w-full mx-auto my-5 p-3 text-base text-gray-500">
          Please sign in to comment!
          <Link
            to={"/sign-in"}
            className="text-cool-blue hover:underline hover:cursor-pointer"
          >
            Signin
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit} className="my-5 p-5 border rounded">
          <textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="300"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-500">
              {300 - comment.length} characters remaining
            </p>
            <button className="font-medium text-midnight-indigo bg-neon-green border border-midnight-indigo rounded px-4 py-2 hover:cursor-pointer hover:shadow-custom-indigo">
              Submit
            </button>
          </div>
        </form>
      )}
      {commentError && (
        <div className=" text-fail-red border bg-fail-red-tint border-red-300 mb-2 p-2 rounded-sm  font-medium text-center">
          <span>{commentError}</span>
        </div>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
}
