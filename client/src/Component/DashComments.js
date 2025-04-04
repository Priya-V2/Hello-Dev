import { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const res = await fetch("/api/comment/get-comments?limit=10");

        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          if (
            data.comments.length < 10 ||
            data.comments.length >= data.totalComments
          ) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      getAllComments();
    }
  }, [currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/get-comments?startIndex=${startIndex}&limit=10`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (comments.length + data.comments.length >= data.totalComments) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/delete-comment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto font-roboto text-base text-dark-charcoal overflow-x-scroll xl:mx-auto mt-4 p-3 overflow-auto">
      {currentUser.isAdmin && comments.length > 0 ? (
        <div className="overflow-auto shadow-custom-indigo rounded">
          <table className="w-[640px] xl:w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 font-medium bg-gray-100 rounded-tl">
                  Date Updated
                </th>
                <th className="px-4 py-3 font-medium bg-gray-100">
                  Comment Content
                </th>
                <th className="px-4 py-3 font-medium bg-gray-100">
                  No. of Likes
                </th>
                <th className="px-4 py-3 font-medium bg-gray-100">Post ID</th>
                <th className="px-4 py-3 font-medium bg-gray-100">User ID</th>
                <th className="px-4 py-3 font-medium bg-gray-100 rounded-tr">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="">
              {comments.map((comment, key) => {
                return (
                  <tr
                    key={key}
                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 "
                  >
                    <td className="px-4 py-3 last:rounded-b-3xl">
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{comment.content}</td>
                    <td className="text-center px-4 py-3">
                      {comment.numberOfLikes}
                    </td>
                    <td className="px-4 py-3">{comment.postId}</td>
                    <td className="px-4 py-3">{comment.userId}</td>
                    <td className="px-4 py-3">
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
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
      ) : (
        <p>You have no comments Yet!</p>
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
              Are you sure you want to delete this comment?
            </span>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="text-white text-sm bg-red-600 px-4 py-2 rounded-md"
                onClick={handleDeleteComment}
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
