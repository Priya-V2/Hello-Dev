import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const FilteredPosts = ({ selectedTags }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(
    "Click on the tags above to filter through topics"
  );

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      if (!selectedTags) return setPosts([]);

      const tags = selectedTags.join(",");
      try {
        const res = await fetch(`/api/post/filter-posts?selectedTags=${tags}`, {
          method: "GET",
        });
        const data = await res.json();

        if (res.ok) {
          setPosts(data.filteredPost);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchFilteredPosts();
  }, [selectedTags]);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setMessage("Click on the tags above to filter through topics");
    } else if (posts.length === 0) {
      setMessage("Posts on this topic will be arriving soon—stay tuned!");
    } else {
      setMessage("");
    }
  }, [posts, selectedTags]);

  return (
    <div className="mx-auto max-w-lg sm:max-w-2xl lg:max-w-6xl mb-12">
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 justify-center">
          {posts &&
            posts.map((post) => {
              return <PostCard key={post._id} relatedPost={post} />;
            })}
        </div>
      ) : (
        <p className="text-center text-dark-charcoal text-base my-24">
          {message}
        </p>
      )}
    </div>
  );
};

export default FilteredPosts;
