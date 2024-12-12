import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Search({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayResults, setDisplayResults] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!query) return setResults([]);

      setLoading(true);
      try {
        const response = await fetch(`/api/post/get-posts?searchTerm=${query}`);
        const data = await response.json();
        if (response.ok) {
          setResults(data.posts);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [query]);

  const handlePostClick = (slug) => {
    navigate(`/post/${slug}`);
    setDisplayResults(false);
  };

  return (
    displayResults && (
      <div className="absolute bg-white border rounded mt-2 w-full max-h-60 overflow-y-auto z-50 shadow-lg">
        {loading && <div className="p-2">Loading...</div>}
        {!loading && results.length === 0 && query && (
          <div className="p-2">No results found</div>
        )}
        <ul>
          {results.map((post) => (
            <li
              key={post._id}
              onClick={() => handlePostClick(post.slug)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
