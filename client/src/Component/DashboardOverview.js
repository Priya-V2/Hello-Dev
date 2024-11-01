import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye, FaRegFileAlt, FaUsers } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { LiaCommentsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function DashboardOverview() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthViews, setLastMonthViews] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `/api/user/get-users/${currentUser._id}?limit=5`
        );
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/get-posts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setTotalViews(data.totalViews);
          setLastMonthPosts(data.lastMonthPosts);
          setLastMonthViews(data.lastMonthViews);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/get-comments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="font-roboto text-dark-charcoal mt-8 p-4 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 mb-12">
        <div
          className="grid grid-cols-2 gap-4 sm:gap-y-4 xl:gap-y-5 w-52 lg:w-44 xl:w-52 px-4 pt-4 pb-3 rounded"
          style={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="self-center justify-self-center bg-orange-50 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 mx-auto rounded-full">
            <FaRegFileAlt className="text-orange-600 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 p-3" />
          </div>
          <div className="self-center justify-self-center">
            <p className="font-bold text-2xl lg:text-xl xl:text-2xl text-center">
              {totalPosts}
            </p>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-600">
              Total Posts
            </p>
          </div>
          <div className="col-span-2 flex items-center ml-4">
            <span className="justify-self-end self-center flex items-center gap-1 text-sm lg:text-xs xl:text-sm text-green-600 mr-1">
              <FaArrowUpLong /> {lastMonthPosts}
            </span>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-500 self-center ml-2 lg:ml-1 xl:ml-2">
              Last Month
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:gap-y-4 xl:gap-y-5 w-52 lg:w-44 xl:w-52 px-4 pt-4 pb-3 rounded"
          style={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="self-center justify-self-center bg-blue-50 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 mx-auto rounded-full">
            <FaEye className="text-blue-600 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 p-3" />
          </div>
          <div className="self-center justify-self-center">
            <p className="font-bold text-2xl lg:text-xl xl:text-2xl text-center">
              {totalViews}
            </p>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-600">
              Total Views
            </p>
          </div>
          <div className="col-span-2 flex items-center ml-4">
            <span className="justify-self-end self-center flex items-center gap-1 text-sm lg:text-xs xl:text-sm text-green-600 mr-1">
              <FaArrowUpLong /> {lastMonthViews}
            </span>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-500 self-center ml-2 lg:ml-1 xl:ml-2">
              Last Month
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:gap-y-4 xl:gap-y-5 w-52 lg:w-44 xl:w-52 px-4 pt-4 pb-3 rounded"
          style={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="self-center justify-self-center bg-teal-50 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 mx-auto rounded-full">
            <FaUsers className="text-teal-600 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 p-3" />
          </div>
          <div className="self-center justify-self-center">
            <p className="font-bold text-2xl lg:text-xl xl:text-2xl text-center">
              {totalUsers}
            </p>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-600">
              Total Users
            </p>
          </div>
          <div className="col-span-2 flex items-center ml-4">
            <span className="justify-self-end self-center flex items-center gap-1 text-sm lg:text-xs xl:text-sm text-green-600 mr-1">
              <FaArrowUpLong /> {lastMonthUsers}
            </span>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-500 self-center ml-2 lg:ml-1 xl:ml-2">
              Last Month
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:gap-y-4 xl:gap-y-5 w-52 lg:w-44 xl:w-52 px-4 pt-4 pb-3 rounded"
          style={{
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="self-center justify-self-center bg-purple-50 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 mx-auto rounded-full">
            <LiaCommentsSolid className="text-purple-600 w-14 lg:w-12 xl:w-14 h-14 lg:h-12 xl:h-14 p-3" />
          </div>
          <div className="self-center justify-self-center pr-4">
            <p className="font-bold text-2xl lg:text-xl xl:text-2xl text-center">
              {totalComments}
            </p>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-600 min-w-max">
              Total Comments
            </p>
          </div>
          <div className="col-span-2 flex items-center ml-4">
            <span className="justify-self-end self-center flex items-center gap-1 text-sm lg:text-xs xl:text-sm text-green-600 mr-1">
              <FaArrowUpLong /> {lastMonthComments}
            </span>
            <p className="text-sm lg:text-xs xl:text-sm text-gray-500 self-center ml-2 lg:ml-1 xl:ml-2">
              Last Month
            </p>
          </div>
        </div>
      </div>
      <div className="rounded shadow-custom-indigo p-4">
        <div className="flex justify-between px-4">
          <h3 className="self-end font-medium">Recent Posts</h3>
          <Link to={"/dashboard?tab=posts"}>
            <button className="text-sm hover:underline hover:cursor-pointer">
              See All
            </button>
          </Link>
        </div>
        <table className="table-auto overflow-x-scroll md:mx-auto mt-4 p-3 scrollbar scrollbar-track-neutral-100 scrollbar-thumb-neutral-300 hover:scrollbar-thumb-neutral-500">
          <thead>
            <tr>
              <th className="font-medium text-center max-w-max bg-gray-100 rounded-l-lg px-6 py-2">
                Date Created
              </th>
              <th className="font-medium text-center bg-gray-100 px-6 py-2">
                Date Updated
              </th>
              <th className="font-medium text-center bg-gray-100 px-6 py-2">
                Title
              </th>
              <th className="font-medium text-center bg-gray-100 px-6 py-2">
                Category
              </th>
              <th className="font-medium text-center min-w-min bg-gray-100 rounded-r-lg px-6 py-2">
                Views
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr className="last:border-b-0">
                  <td className="text-center text-gray-600 px-6 py-2 border-b">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-center text-gray-600 px-6 py-2 border-b">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="font-medium px-6 py-2 border-b">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="text-gray-500 pl-6 px-6 py-2 border-b">
                    {post.category}
                  </td>
                  <td className="font-medium px-6 py-2 border-b">
                    {post.views}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      ;
    </div>
  );
}
