import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../Component/PostCard";
import { FaArrowUp } from "react-icons/fa6";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/get-posts");

      const data = await res.json();

      if (res.ok) {
        setPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, []);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(`/api/post/get-posts?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-roboto text-dark-charcoal">
      <div className="py-28 px-4 sm:12 md:px-28 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl mb-4">
          Welcome to my Blog
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
      </div>
      <div className="lg:max-w-6xl w-full mx-auto mb-24">
        <h3 className="font-medium text-base lg:text-xl text-center mt-8 mb-2 sm:mb-4">
          Recent Posts
        </h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2">
          {posts &&
            posts.map((post) => <PostCard key={post._id} relatedPost={post} />)}
        </div>
        {showMore && (
          <button
            onClick={handleShowMore}
            className="w-full text-blue-700 text-sm text-center py-6 hover:underline"
          >
            Show more
          </button>
        )}
      </div>
      <button
        onClick={() => window.scrollTo(0, 0)}
        className="p-2 lg:p-3 rounded-full shadow-custom-indigo fixed bottom-8 right-2 sm:right-4 xl:right-8"
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
