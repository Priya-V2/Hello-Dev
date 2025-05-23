import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutUserSuccess } from "../redux/user/userSlice";
import { FaUser, FaRegFileAlt, FaUsers } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { LiaCommentsSolid } from "react-icons/lia";
import { BiSolidDashboard } from "react-icons/bi";
import { FaRegBookmark, FaThumbsUp } from "react-icons/fa6";

export default function DashSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutUserSuccess());
        return navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="font-roboto w-full md:w-48 lg:w-56 text-dark-charcoal bg-midnight-indigo min-h-max md:min-h-screen border-b-2 border-midnight-indigo p-4 md:p-2 md:pt-3 mb-4 sm:mb-0">
        {currentUser.isAdmin && (
          <Link to={"/dashboard?tab=dashboard"}>
            <div
              className={`flex items-center gap-3 text-white rounded p-1.5 mb-1 cursor-pointer hover:bg-midnight-indigo-tint ${
                tab === "dashboard" && "bg-midnight-indigo-tint"
              }`}
            >
              <BiSolidDashboard className="w-5 h-5 ml-2" />
              <span className="text-sm lg:text-base font-medium">
                Dashboard
              </span>
            </div>
          </Link>
        )}

        <Link to={"/dashboard?tab=profile"}>
          <div
            className={`flex items-center gap-3 text-white rounded p-1.5 mb-1 cursor-pointer hover:bg-midnight-indigo-tint ${
              tab === "profile" && "bg-midnight-indigo-tint"
            }`}
          >
            <FaUser className="w-4 h-4 ml-2" />
            <span className="text-sm lg:text-base font-medium">Profile</span>
            <span className="font-bold text-xs tracking-wide ml-auto text-dark-charcoal bg-neon-green px-3 py-1 rounded">
              {currentUser.isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </Link>

        <Link to={"/dashboard?tab=bookmark"}>
          <div
            className={`flex items-center gap-3 text-white rounded p-1.5 mb-1 cursor-pointer hover:bg-midnight-indigo-tint ${
              tab === "bookmark" && "bg-midnight-indigo-tint"
            }`}
          >
            <FaRegBookmark className="w-4 h-4 ml-2" />
            <span className="text-sm lg:text-base font-medium">Bookmark</span>
          </div>
        </Link>

        <Link to={"/dashboard?tab=liked-posts"}>
          <div
            className={`flex items-center gap-3 text-white rounded p-1.5 mb-1 cursor-pointer hover:bg-midnight-indigo-tint ${
              tab === "liked-posts" && "bg-midnight-indigo-tint"
            }`}
          >
            <FaThumbsUp className="w-4 h-4 ml-2" />
            <span className="text-sm lg:text-base font-medium">
              Liked Posts
            </span>
          </div>
        </Link>

        {currentUser.isAdmin && (
          <>
            <Link to={"/dashboard?tab=posts"}>
              <div
                className={`flex items-center gap-3 text-white active:bg-midnight-indigo-tint rounded p-1.5 mb-1 cursor-pointer hover:bg-midnight-indigo-tint ${
                  tab === "posts" && "bg-midnight-indigo-tint"
                }`}
              >
                <FaRegFileAlt className="w-5 h-5 ml-1" />
                <span className="text-sm lg:text-base font-medium">Posts</span>
              </div>
            </Link>

            <Link to={"/dashboard?tab=users"}>
              <div
                className={`flex items-center gap-3 text-white active:bg-midnight-indigo-tint rounded p-1.5 mb-1 cursor-pointer hover:bg-midnight-indigo-tint ${
                  tab === "users" && "bg-midnight-indigo-tint"
                }`}
              >
                <FaUsers className="w-5 h-5 ml-1" />
                <span className="text-sm lg:text-base font-medium">Users</span>
              </div>
            </Link>

            <Link to={"/dashboard?tab=comments"}>
              <div
                className={`flex items-center gap-3 text-white active:bg-midnight-indigo-tint rounded p-1.5 mb-1 cursor-pointer hover:bg-midnight-indigo-tint ${
                  tab === "comments" && "bg-midnight-indigo-tint"
                }`}
              >
                <LiaCommentsSolid className="w-5 h-5 ml-1" />
                <span className="text-sm lg:text-base font-medium">
                  Comments
                </span>
              </div>
            </Link>
          </>
        )}

        <div
          className={`flex items-center gap-3 text-white p-1.5 cursor-pointer rounded hover:bg-midnight-indigo-tint ${
            tab === "signout" && "bg-midnight-indigo-tint"
          }`}
        >
          <RiLogoutBoxRLine className="w-5 h-5 ml-1" />
          <span
            className="text-sm lg:text-base font-medium"
            onClick={handleSignout}
          >
            Sign out
          </span>
        </div>
      </div>
    </div>
  );
}
