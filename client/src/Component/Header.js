import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);

  const toggleMenu = () => {
    setMenuDisplay((prevState) => !prevState);
  };

  const gridSettings = isSearchOnFocus
    ? "grid-cols-2 sm:grid-cols-[1fr_1fr_2fr]"
    : "grid-cols-2 sm:grid-cols-3";

  return (
    <div>
      <nav
        className={`grid ${gridSettings} text-white bg-midnight-indigo font-roboto font-medium text-xs sm:text-sm md:text-base lg:px-6 sm:px-3 px-2 md:py-3 py-2  border-y-2`}
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
          <ul className="flex items-center gap-4">
            <li className="flex items-center border border-dark-bg-dark-charcoal p-1 rounded-md bg-white  ">
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
                src="/images/search.png"
                alt="Search icon"
                className="w-4 h-4 lg-w-6"
              />
            </li>

            <Link to="/sign-in">
              <li className="bg-neon-green px-4 text-midnight-indigo py-6px rounded">
                Sign in
              </li>
            </Link>

            <button className="sm:hidden" onClick={() => toggleMenu()}>
              <img src="/images/menu.png" alt="Menu icon" className="w-4" />
            </button>
          </ul>
        </div>
      </nav>
      <div
        className={`menu-container fixed top-0 left-0 w-full h-full bg-midnight-indigo text-white text-base transition-transform duration-300 ease-in-out ${
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
          <Link to="/">
            <li className="mb-4" onClick={() => toggleMenu()}>
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="mb-4" onClick={() => toggleMenu()}>
              About
            </li>
          </Link>
          <Link to="/topics">
            <li className="mb-4" onClick={() => toggleMenu()}>
              Topics
            </li>
          </Link>
          <Link to="/sign-in">
            <li>Sign in</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
