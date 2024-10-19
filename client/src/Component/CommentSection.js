import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);

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
      }
    } catch (error) {
      setCommentError(error);
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
    </div>
  );
}
