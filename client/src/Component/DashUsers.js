import React, { useEffect, useState } from "react";
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
                    <img
                      src={user.profilePicture}
                      alt="user profile"
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full hover:cursor-pointer"
                    />
                  </td>
                  <td className="font-medium px-6 py-3 hover:cursor-pointer">
                    {user.username}
                  </td>
                  <td className="font-normal text-neutral-500 px-6 py-3">
                    {user.email}
                  </td>
                  <td className="px-8 py-4">
                    <img
                      className="w-7 h-7"
                      src={`${
                        user.isAdmin
                          ? "/images/correct.png"
                          : "/images/wrong.png"
                      }`}
                      alt={`${user.isAdmin ? "admin true" : "admin false"}`}
                    />
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/6 lg:w-96 text-base text-center bg-white p-12  rounded-md shadow-lg z-10 ">
            <button
              className="absolute top-2 right-4 text-3xl text-gray-800 cursor-pointer bg-none"
              onClick={() => {
                setShowModal(false);
              }}
            >
              &times;
            </button>
            <span className="text-lg font-medium">
              Are you sure you want to delete this user?
            </span>
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={handleDeleteUser}
                className="text-white bg-red-600 px-4 py-2 rounded-md"
              >
                Yes, I'm sure
              </button>
              <button
                className="border px-4 py-2 rounded-md"
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
