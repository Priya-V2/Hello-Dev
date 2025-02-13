import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../Component/PostCard";
import {
  FaArrowUp,
  FaEnvelope,
  FaGithub,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/get-posts");

      const data = await res.json();

      if (res.ok) {
        setPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, []);

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

  const socialMedium = [
    {
      icon: (
        <FaEnvelope className="text-lg text-white group-hover:text-red-700" />
      ),
      appName: "Email",
      link: "https://mail.google.com/mail/?view=cm&to=priyav2.bct@gmail.com",
    },
    {
      icon: (
        <FaLinkedin className="text-lg text-white group-hover:text-blue-600" />
      ),
      appName: "Linked in",
      link: "https://www.linkedin.com/in/priya-v2",
    },
    {
      icon: <FaGithub className="text-lg text-white group-hover:text-black" />,
      appName: "GitHub",
      link: "https://github.com/priya-V2",
    },
    {
      icon: (
        <FaXTwitter className="text-lg text-white group-hover:text-black" />
      ),
      appName: "X Platform",
      link: "https://x.com/Priya_v2",
    },
  ];

  return (
    <div className="font-roboto text-dark-charcoal">
      <div className="my-8 py-16 px-4 sm:12 md:px-28 max-w-6xl mx-auto">
        <h1 className="font-bold text-2xl lg:text-3xl xl:text-4xl text-center mb-3 tracking-wide lg:mb-4">
          Hello, Dev! Your Hub for Web Development Insights.
        </h1>

        <p className="text-base lg:text-lg xl:text-xl text-center tracking-wide">
          Explore tutorials, tips, and guides to level up your coding journey.
        </p>

        <div className="flex gap-2 sm:gap-6 justify-center items-center font-semibold text-xs lg:text-sm xl:text-base text-midnight-indigo tracking-widest my-4">
          <button
            type="button"
            className="uppercase bg-neon-green border border-neon-green px-4 py-2 rounded hover:shadow-custom-indigo"
          >
            Start Learning
          </button>

          <div className="w-px h-8 bg-midnight-indigo"></div>

          <button
            type="button"
            className="uppercase border border-midnight-indigo px-4 py-2 rounded hover:shadow-custom-indigo"
          >
            browse topics
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm mt-8">
          {socialMedium.map((socialMedia, index) => {
            const { icon: Icon, appName, link } = socialMedia;
            return (
              <a
                key={index}
                href={link}
                rel="noopener noreferrer"
                target="_blank"
                className={`group flex items-center justify-center gap-1 sm:gap-2 bg-[#444] border-2 border-[#444] px-2 sm:px-4 py-2 w-max rounded-full hover:cursor-pointer hover:shadow-custom-indigo hover:bg-white`}
              >
                {Icon}
                <span className="hidden sm:block text-xs text-white group-hover:text-midnight-indigo">
                  {appName}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 xl:px-4 mb-24">
        <div className="flex justify-between font-semibold uppercase tracking-wider text-xs sm:text-sm md:text-base mt-8 mb-2 sm:mb-4 px-0 xl:px-2">
          <p className="">Explore Posts</p>
          <Link
            to={"/topics"}
            className="flex gap-3 items-center hover:text-blue-700 hover:underline"
          >
            <FiFilter />
            <span>Apply Filters</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {posts &&
            posts.map((post) => <PostCard key={post._id} relatedPost={post} />)}
        </div>

        {showMore && (
          <button
            onClick={handleShowMore}
            className="w-full text-blue-700 text-sm text-center py-6 hover:underline"
          >
            Show more
          </button>
        )}
      </div>

      <button
        onClick={() => window.scrollTo(0, 0)}
        className="p-2 lg:p-3 rounded-full shadow-custom-indigo fixed bottom-8 right-2 sm:right-4 xl:right-8"
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
