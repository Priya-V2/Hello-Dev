import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Search from "../Component/Search";
import { FiFilter } from "react-icons/fi";
import FilteredPosts from "../Component/FilteredPosts";

export default function Topics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [predefinedTags, setPredefinedTags] = useState([]);

  const handleSelectedTags = (id) => {
    const tag = predefinedTags[id];
    setSelectedTags((prevState) => {
      if (prevState.includes(tag)) {
        return prevState.filter((x) => x !== tag);
      }
      return [...prevState, tag];
    });
  };

  useEffect(() => {
    try {
      const getPredefinedTags = async () => {
        const res = await fetch("/api/settings/get-setting", {
          request: "GET",
        });

        const data = await res.json();
        if (res.ok) {
          setPredefinedTags(data.predefinedTags);
        }
      };
      getPredefinedTags();
      console.log(predefinedTags);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="text-[8px] sm:text-xs lg:text-sm text-dark-charcoal max-w-lg sm:max-w-2xl lg:max-w-4xl mx-auto mt-10 mb-20 md:mb-0 min-h-screen">
      <div className="flex items-center justify-between gap-8 px-4 py-2 mx-8 mb-4 border rounded">
        <form>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="w-[256px] sm:w-[512px] lg:w-[672px] focus:outline-none"
          />
        </form>
        <FaSearch className="text-midnight-indigo w-5 sm:w-6 h-3 sm:h-4" />
      </div>

      {searchQuery && <Search query={searchQuery} />}

      <div className="flex gap-3 items-center font-medium text-sm md:text-base uppercase tracking-wider mb-4 md:mb-6 mx-12">
        <FiFilter />
        <span>Filters</span>
      </div>

      <div className="flex flex-wrap overflow-visible gap-3 px-12 mb-8">
        {predefinedTags.map((tag, index) => (
          <button
            key={index}
            className={`font-medium uppercase tracking-wider min-w-max px-2 sm:px-4 py-1 border rounded-full hover:cursor-pointer hover:shadow-custom-indigo
              ${selectedTags.includes(tag) ? "bg-neutral-500 text-white" : ""}
            `}
            onClick={() => {
              handleSelectedTags(index);
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <FilteredPosts selectedTags={selectedTags} />
    </div>
  );
}
