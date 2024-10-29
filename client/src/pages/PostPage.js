import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../Component/CommentSection";
import PostCard from "../Component/PostCard";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState(null);
  const { postSlug } = useParams();

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
      <span className="block text-sm text-gray-500 text-center mb-4">
        {post &&
          new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </span>
      <h1 className="font-medium text-2xl sm:text-3xl lg:text-4xl text-center mb-4">
        {post && post.title}
      </h1>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="w-full max-h-[600px] p-4 object-cover"
      />
      <div
        className="max-w-2xl w-full mx-auto my-4 px-3 post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
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
    </main>
  );
}
