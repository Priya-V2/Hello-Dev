import React, { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaCheck, FaCircleUser, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch(`/api/user/get-users/${currentUser._id}`);

        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 10) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      getAllUsers();
    }
  }, [currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/get-users?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 10) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto font-roboto text-base text-dark-charcoal overflow-x-scroll md:mx-auto mt-4 p-3 scrollbar scrollbar-track-neutral-100 scrollbar-thumb-neutral-300 hover:scrollbar-thumb-neutral-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <table className="shadow-custom-indigo rounded">
          <thead>
            <tr>
              <th className="px-6 py-3 font-medium bg-gray-100 rounded-tl">
                Date create
              </th>
              <th className="px-6 py-3 font-medium bg-gray-100">User image</th>
              <th className="px-6 py-3 font-medium bg-gray-100">User name</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Email</th>
              <th className="px-6 py-3 font-medium bg-gray-100">Admin</th>
              <th className="px-6 py-3 font-medium bg-gray-100 rounded-tr">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user, key) => {
              return (
                <tr
                  key={key}
                  className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 "
                >
                  <td className="px-6 py-3 last:rounded-b-3xl">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-11 py-3">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="user profile"
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full hover:cursor-pointer"
                      />
                    ) : (
                      <FaCircleUser className="w-10 h-10 object-cover text-center rounded-full" />
                    )}
                  </td>
                  <td className="font-medium px-6 py-3 hover:cursor-pointer">
                    {user.username}
                  </td>
                  <td className="font-normal text-neutral-500 px-6 py-3">
                    {user.email}
                  </td>
                  <td className="px-10 py-4">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500 w-6 h-6" />
                    ) : (
                      <FaXmark className="text-red-500 w-6 h-6" />
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
      ) : (
        <p>You have no users Yet!</p>
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
              Are you sure you want to delete this user?
            </span>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="text-white text-sm bg-red-600 px-4 py-2 rounded-md"
                onClick={handleDeleteUser}
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
