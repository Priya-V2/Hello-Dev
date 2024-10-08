import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await fetch("/api/post/get-posts?startIndex=0&limit=100");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      getAllPosts();
    }
  }, [currentUser.isAdmin]);

  return (
    <div className="table-auto font-roboto text-base text-dark-charcoal overflow-x-scroll md:mx-auto mt-4 p-3 scrollbar scrollbar-track-neutral-100 scrollbar-thumb-neutral-300 hover:scrollbar-thumb-neutral-500">
      {currentUser.isAdmin && posts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className="px-6 py-3 font-medium bg-gray-100 rounded-tl-lg">
                Date Updated
              </th>
              <th className="px-6 py-3 font-medium bg-gray-100">Post Image</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Post Title</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Category</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Delete</th>
              <th className="px-6 py-3 font-medium bg-gray-100 rounded-tr-lg">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="">
            {posts.map((post, key) => {
              return (
                <tr
                  key={key}
                  className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
                >
                  <td className="px-6 py-3">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title || "Post Image"}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </td>
                  <td className="font-medium min-w-96 px-6 py-3">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="font-medium px-6 py-3">{post.category}</td>
                  <td className="px-6 py-3">
                    <span className="text-red-700 hover:underline">Delete</span>
                  </td>
                  <td className="px-6 py-3">
                    <Link
                      className="text-blue-800 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>You have no posts Yet!</p>
      )}
    </div>
  );
}
