import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  // return <div>Signup</div>;

  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuDisplay((prev) => !prev);
  };

  const gridSettings = isSearchOnFocus
    ? "grid-cols-2 sm:grid-cols-[1fr_1fr_2fr]"
    : "grid-cols-2 sm:grid-cols-3";

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuDisplay && !event.target.closest(".menu-container")) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuDisplay]);

  return (
    <div>
      <nav
        className={`grid ${gridSettings} text-main-grey font-medium lg:px-6 sm:px-3 px-2 md:py-1 py-1 text-xs sm:text-sm md:text-base border-y-2`}
      >
        <div className="self-center justify-self-start flex gap-2">
          <Link to="/">
            <img src="/images/logo.png" alt="Hello dev logo" className="w-24" />
          </Link>
        </div>

        <div className="self-center justify-self-center hidden sm:block">
          <ul className="flex gap-6">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/topics">
              <li>Topics</li>
            </Link>
          </ul>
        </div>

        <div className="self-center justify-self-end">
          <ul className="flex items-center gap-4">
            <li className="flex items-center border border-main-grey p-1 rounded-md">
              <form>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  onFocus={() => setIsSearchOnFocus(true)}
                  onBlur={() => setIsSearchOnFocus(false)}
                  className="focus:outline-none text-xs lg:text-sm w-16 lg:w-32 focus:w-20 sm:focus:w-40 lg:focus:w-60 transition-width duration-300"
                />
              </form>
              <img
                src="/images/search-grey.png"
                alt="Search icon"
                className="w-4 h-4 lg:w-6"
              />
            </li>

            <Link to="/signin">
              <li>Sign in</li>
            </Link>

            <button className="sm:hidden" onClick={toggleMenu}>
              <img
                src="/images/menu-grey.png"
                alt="Menu icon"
                className="w-4"
              />
            </button>
          </ul>
        </div>
      </nav>

      <div
        className={`menu-container fixed top-0 left-0 w-full h-full bg-main-grey text-white text-base transition-transform duration-300 ease-in-out ${
          menuDisplay
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button onClick={toggleMenu} className="text-white text-xl">
            &times;
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center h-full">
          <Link to="/" onClick={toggleMenu}>
            <li className="mb-4">Home</li>
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            <li className="mb-4">About</li>
          </Link>
          <Link to="/topics" onClick={toggleMenu}>
            <li className="mb-4">Topics</li>
          </Link>
          <Link to="/signin" onClick={toggleMenu}>
            <li>Sign in</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

// export default Header;
