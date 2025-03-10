import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutUserSuccess } from "../redux/user/userSlice";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Search from "./Search";

function Header() {
  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [dropDownDisplay, setDropDownDisplay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const toggleMenu = () => {
    setMenuDisplay((prevState) => !prevState);
  };
  const toggleDropdown = () => {
    setDropDownDisplay((prevState) => !prevState);
  };

  const gridSettings = isSearchOnFocus
    ? "grid-cols-2 sm:grid-cols-[1fr_1fr_2fr]"
    : "grid-cols-2 sm:grid-cols-3";

  const handleSignout = async () => {
    setDropDownDisplay(false);
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutUserSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav
        className={`grid ${gridSettings} text-white bg-midnight-indigo font-roboto font-medium text-xs sm:text-sm md:text-base ${
          currentUser ? "px-4 py-3" : "px-2 sm:px-4 py-2 md:py-4"
        }`}
      >
        <div className="self-center justify-self-start flex gap-2">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Hello dev logo"
              className="sm:w-32 lg:w-40 w-28"
            />
          </Link>
        </div>

        <div className="self-center justify-self-center hidden sm:block">
          <ul className="flex gap-6">
            <Link to="/" className="hover:text-neon-green">
              <li>Home</li>
            </Link>
            <Link to="/about" className="hover:text-neon-green">
              <li>About</li>
            </Link>
            <Link to="/topics" className="hover:text-neon-green">
              <li>Topics</li>
            </Link>
          </ul>
        </div>

        <div className="self-center justify-self-end">
          <ul className="flex items-center gap-2">
            <li className="hidden sm:flex items-center border border-dark-bg-dark-charcoal p-1 rounded-md bg-white">
              <form>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  onFocus={() => setIsSearchOnFocus(true)}
                  onBlur={() => setIsSearchOnFocus(false)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  className="focus:outline-none text-xs text-dark-charcoal lg:text-sm w-14 sm:w-16 lg:w-32 focus:w-20 sm:focus:w-40 lg:focus:w-60 transition-width duration-300"
                />
              </form>
              <FaSearch className="text-midnight-indigo w-4 h-4 lg-w-6" />
            </li>

            {currentUser ? (
              <li className="flex items-center">
                <button
                  type="button"
                  className="flex items-center"
                  onClick={() => toggleDropdown()}
                >
                  {currentUser.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt="profile img"
                      className="w-8 sm:w-10 h-8 sm:h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex w-8 sm:w-10 h-8 sm:h-10 items-center justify-center text-white border p-1 border-white rounded-full">
                      <FaUser className="w-3.5 sm:w-5 h-3.5 sm:h-5 self-center justify-self-center text-white" />
                    </div>
                  )}
                </button>
              </li>
            ) : (
              <li className="text-midnight-indigo bg-neon-green px-4 py-6px rounded">
                <Link to="/sign-in">Sign in</Link>
              </li>
            )}

            <li className="flex items-center sm:hidden">
              <button onClick={() => toggleMenu()}>
                <IoMenu className="w-6 h-6 text-white" />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {searchQuery && <Search query={searchQuery} />}

      <div
        className={`${
          dropDownDisplay ? "absolute" : "hidden"
        } top-13 right-10 md:top-14 sm:right-4 text-dark-charcoal text-sm bg-white border rounded min-h-3 hover:shadow-custom-indigo`}
      >
        <Link to="/dashboard?tab=profile">
          <div
            className="flex gap-2 items-center p-3 hover:bg-neutral-200 "
            onClick={() => toggleDropdown()}
          >
            <FaUser className="w-4 h-4 ml-1 text-dark-charcoal" />
            <span>Profile</span>
          </div>
        </Link>
        <hr className="mx-3 border-b border-neutral-400" />
        <div
          className="flex gap-2 items-center p-3 hover:bg-neutral-200"
          onClick={handleSignout}
        >
          <RiLogoutBoxRLine className="w-5 h-5 text-dark-charcoal" />
          <a href="#">Sign out</a>
        </div>
      </div>

      {menuDisplay && (
        <div
          className={`absolute top-0 left-0 bg-white w-screen h-screen text-dark-charcoal text-base transform transition-transform duration-1000 ease-in-out ${
            menuDisplay ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="absolute top-4 right-4">
            <button onClick={toggleMenu} className="text-dark-charcoal text-xl">
              &times;
            </button>
          </div>
          <div className="flex flex-col mt-24 mx-10">
            <div className="self-start flex items-center justify-between bg-white border w-full p-1 mb-36 rounded-md">
              <form>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  onFocus={() => setIsSearchOnFocus(true)}
                  onBlur={() => setIsSearchOnFocus(false)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  className="focus:outline-none text-sm text-dark-charcoal w-52 focus:w-60 transition-width duration-300"
                />
              </form>
              <FaSearch className="text-midnight-indigo w-6 h-4" />
            </div>
            <ul className="flex flex-col items-center">
              <Link to="/" onClick={() => toggleMenu()}>
                <li className="mb-4">Home</li>
              </Link>
              <Link to="/about" onClick={() => toggleMenu()}>
                <li className="mb-4">About</li>
              </Link>
              <Link to="/topics" onClick={() => toggleMenu()}>
                <li className="mb-4">Topics</li>
              </Link>
              <Link to="/sign-in" onClick={() => toggleMenu()}>
                <li>Sign in</li>
              </Link>
            </ul>
            <div className="text-midnight-indigo text-center mt-36 bg-neon-green border border-midnight-indigo px-4 py-6px w-full rounded">
              <Link to="/sign-up">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
