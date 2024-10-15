import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Component/DashSidebar";
import DashProfile from "../Component/DashProfile";
import DashPosts from "../Component/DashPosts";
import DashUsers from "../Component/DashUsers";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row ">
      <div>
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
    </div>
  );
}
