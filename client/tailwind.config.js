/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      alabaster: "#f5f5f5",
      "dark-charcoal": "#333",
      "neon-green": "#39FF14",
      "neon-green-tint": "#9cff8a",
      "cool-blue": "#1E90FF",
      "midnight-indigo": "#201e43",
      "midnight-indigo-tint": "#63627b",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      league: ["League Spartan", "sans-serif"],
      quicksand: ["Quicksand", "sans-serif"],
    },
    spacing: {
      "6px": "6px",
    },
    boxShadow: {
      "custom-indigo": "0 2px 8px rgba(33, 14, 67, 0.28)",
    },
  },
};

export const plugins = [tailwindScrollbar];
