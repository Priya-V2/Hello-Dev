import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "../Component/CommentSection";
import PostCard from "../Component/PostCard";
import PostContent from "../Component/PostContent";
import { FaArrowUp } from "react-icons/fa";
import {
  FaBookmark,
  FaComment,
  FaEye,
  FaShare,
  FaThumbsUp,
} from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function PostPage() {
  const { currentUser } = useSelector((store) => store.user);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState(null);
  const [likes, setLikes] = useState("No likes yet!");
  const { postSlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      const fetchPost = async () => {
        const res = await fetch(`/api/post/get-posts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setLoading(false);
          setError(data.message);
        } else {
          setLoading(false);
          setPost(data.posts[0]);
          setLikes(data.posts[0].likes);
        }
      };
      fetchPost();
    } catch (error) {
      setError(error);
    }
  }, [postSlug]);

  useEffect(() => {
    if (!post) return;

    try {
      const fetchRelatedPost = async () => {
        const res = await fetch(
          `/api/post/get-posts?category=${post && post.category}&limit=5`
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
        } else {
          setError(false);

          const filteredPosts = await data.posts.filter(
            (relatedPost) => relatedPost._id !== post._id
          );

          if (filteredPosts.length === "3") {
            setRelatedPosts(filteredPosts);
          } else {
            setRelatedPosts(filteredPosts.slice(0, 3));
          }
        }
      };
      fetchRelatedPost();
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }, [post]);

  const handleLike = async () => {
    try {
      if (!currentUser) {
        alert("Please sign-in to like the post");
        navigate("/sign-in");
        return;
      }
      const res = await fetch(
        `/api/post/like-post/${post._id}/${currentUser._id}`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        setLikes(data.post.likes);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-4 w-4 text-midnight-indigo border-4 border-t-transparent border-midnight-indigo rounded-full justify-items-center"
          viewBox="0 0 24 24"
          style={{ borderWidth: "3px" }}
        ></svg>
      </div>
    );
  }
  return (
    <main className="font-roboto text-base text-dark-charcoal max-w-5xl mx-auto min-h-screen p-5 md:p-8">
      <div className="flex justify-between text-neutral-500 max-w-3xl mb-4 mx-auto p-2 border-b-2">
        <span className="block text-sm text-gray-500 text-center">
          {post &&
            new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </span>
        <div className="flex gap-3">
          <FaThumbsUp className="text-neutral-500"></FaThumbsUp>
          <FaComment />
          <FaEye />
          <FaShare />
          <FaBookmark />
        </div>
      </div>

      <h1 className="font-medium text-2xl sm:text-3xl lg:text-4xl text-center mb-4">
        {post && post.title}
      </h1>

      <img
        src={post && post.image}
        alt={post && post.title}
        className="w-full max-h-[600px] mx-auto p-4 object-cover"
      />

      <PostContent post={post} />

      <CommentSection postId={post && post._id} />

      <div className="lg:max-w-6xl w-full mx-auto">
        <h3 className="font-medium text-base lg:text-xl text-center mt-8 mb-2 sm:mb-4">
          Related Posts
        </h3>
        <div className="flex flex-col sm:flex-row justify-between ">
          {relatedPosts &&
            relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost._id} relatedPost={relatedPost} />
            ))}
        </div>
      </div>
      <button
        onClick={() => window.scrollTo(0, 0)}
        className="p-2 lg:p-3 rounded-full shadow-custom-indigo fixed bottom-8 right-2 sm:right-4 xl:right-8"
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
    </main>
  );
}
