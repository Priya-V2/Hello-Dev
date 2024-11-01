import React, { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await fetch("/api/post/get-posts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      getAllPosts();
    }
  }, [currentUser.isAdmin]);

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

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/delete-post/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto font-roboto text-base text-dark-charcoal overflow-x-scroll md:mx-auto mt-4 p-3 scrollbar scrollbar-track-neutral-100 scrollbar-thumb-neutral-300 hover:scrollbar-thumb-neutral-500">
      {currentUser.isAdmin && posts.length > 0 ? (
        <table className="shadow-custom-indigo rounded">
          <thead>
            <tr>
              <th className="px-6 py-3 font-medium bg-gray-100 rounded-tl">
                Date Updated
              </th>
              <th className="px-6 py-3 font-medium bg-gray-100">Post Image</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Post Title</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Category</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Views</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Delete</th>
              <th className="px-6 py-3 font-medium bg-gray-100 rounded-tr">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="">
            {posts.map((post, key) => {
              return (
                <tr
                  key={key}
                  className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 "
                >
                  <td className="px-6 py-3 last:rounded-b-3xl">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title || "Post Image"}
                        className="w-20 h-10 object-cover bg-gray-500 hover:cursor-pointer"
                      />
                    </Link>
                  </td>
                  <td className="font-medium min-w-96 px-6 py-3 hover:cursor-pointer">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="font-normal text-neutral-500 px-6 py-3">
                    {post.category}
                  </td>
                  <td className="font-medium px-6 py-3">{post.views}</td>
                  <td className="px-6 py-3">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="text-red-700 hover:underline hover:cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <Link
                      className="text-blue-700 hover:underline hover:pointer"
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
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-blue-700 text-sm text-center py-6 hover:underline"
        >
          Show more
        </button>
      )}
      {showModal && (
        <div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 text-base text-center bg-white px-6 py-8 rounded-md shadow-lg z-10 ">
            <button
              className="absolute top-2 right-4 text-3xl text-gray-800 cursor-pointer bg-none"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <BsExclamationCircle className="text-gray-500 w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-4 sm:mb-6" />
            <span className="text-base sm:text-lg text-gray-500 w-4">
              Are you sure you want to delete this post?
            </span>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="text-white text-sm bg-red-600 px-4 py-2 rounded-md"
                onClick={handleDeletePost}
              >
                Yes, I'm sure
              </button>
              <button
                className="text-sm border px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-sm z-5"></div>
        </div>
      )}
    </div>
  );
}
