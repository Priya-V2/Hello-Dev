import { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashLikedPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `/api/post/get-multiple-posts/like/${currentUser._id}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
        } else {
          setPosts(data);
          setError(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/post/delete-bookmark/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setPosts(data);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="table-auto min-h-screen xl:mx-auto overflow-auto">
      {error && (
        <div className="text-red-700 bg-red-100 my-8 p-2 rounded-sm font-medium text-center">
          <span>{error}</span>
        </div>
      )}

      <div className="overflow-auto shadow-custom-indigo rounded my-12">
        <table className="w-[640px] xl:w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 font-medium bg-gray-100 rounded-tl">
                Date Created
              </th>
              <th className="px-6 py-3 font-medium bg-gray-100">Post Image</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Post Title</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Category</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Delete</th>
            </tr>
          </thead>
          <tbody className="">
            {posts &&
              posts.map((post, key) => {
                return (
                  <tr
                    key={key}
                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 "
                  >
                    <td className="px-6 py-3 last:rounded-b-3xl">
                      {new Date(post.createdAt).toLocaleDateString()}
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
                    <td className="font-medium text-neutral-500 text-center uppercase tracking-wide px-6 py-3">
                      {post.category}
                    </td>
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
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
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
              Are you sure you want to delete this post from your bookmarks?
            </span>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="text-white text-sm bg-red-600 px-4 py-2 rounded-md"
                onClick={() => {
                  setShowModal(false);
                  handleDelete();
                }}
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
