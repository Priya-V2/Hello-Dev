import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Component/DashSidebar";
import DashboardOverview from "../Component/DashboardOverview";
import DashProfile from "../Component/DashProfile";
import DashPosts from "../Component/DashPosts";
import DashUsers from "../Component/DashUsers";
import DashComments from "../Component/DashComments";
import DashBookmark from "../Component/DashBookmark";

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
      {tab === "dashboard" && <DashboardOverview />}
      {tab === "profile" && <DashProfile />}
      {tab === "bookmark" && <DashBookmark />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComments />}
    </div>
  );
}
