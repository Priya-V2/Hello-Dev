import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { signoutUserSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Footer() {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="font-quicksand text-dark-charcoal text-base mt-12 sm:mt-0">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-12 items-center justify-items-stretch bg-alabaster border-t-2 border-midnight-indigo h-max md:h-52 p-4 sm:px-8 lg:px-16 xl:px-32">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="md:self-start">
            <img
              src="/images/logo-midnight-indigo.png"
              alt="Hello dev logo"
              className="w-48 lg:w-56"
            />
          </Link>

          <div className="flex items-center justify-center gap-3 text-sm pl-2 mt-3">
            {socialMedium.map((socialMedia, index) => {
              const { icon: Icon, appName, link } = socialMedia;
              return (
                <a
                  key={index}
                  href={link}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={`group flex items-center justify-center gap-1 bg-neutral-500 border-2 px-2 py-2 w-max rounded-full hover:cursor-pointer hover:shadow-custom-indigo hover:bg-white`}
                >
                  {Icon}
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 justify-items-center gap-2 md:gap-6 xl:gap-12 text-sm md:text-base">
          <div className="flex flex-col gap-2 font-medium text-[#666]">
            <h4 className="font-extrabold text-dark-charcoal uppercase tracking-wider">
              Account
            </h4>
            <a href="/sign-up">Sign up</a>
            <a href="/sign-in">Sign in</a>
            <button
              type="button"
              onClick={() => handleSignout()}
              className="text-left"
            >
              Sign out
            </button>
          </div>

          <div className="flex flex-col gap-2 font-medium text-[#666]">
            <h4 className="font-extrabold text-dark-charcoal uppercase tracking-wider">
              Dashboard
            </h4>
            <a href="/dashboard?tab=profile">Profile</a>
            <a href="/dashboard?tab=liked-posts">Liked Posts</a>
            <a href="/dashboard?tab=bookmark">Bookmark</a>
          </div>

          <div className="flex flex-col gap-2 font-medium text-[#666]">
            <h4 className="font-extrabold text-dark-charcoal uppercase tracking-wider">
              Navigation
            </h4>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/topics">Topics</a>
          </div>
        </div>
      </div>

      <div className="text-white bg-midnight-indigo px-4 py-2">
        <p className="text-center mb-2 sm:m-0">
          &copy; 2025 HELLO DEV! All rights reserved.
        </p>
      </div>
    </footer>
  );
}
