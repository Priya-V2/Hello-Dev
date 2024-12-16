import React, { useState } from "react";
import { FaCheck, FaLink } from "react-icons/fa";
import {
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
  FaXTwitter,
} from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function SharePost({ title }) {
  const location = useLocation();
  const currentURL = `${window.location.origin}${location.pathname}`;
  const [copySuccess, setCopySuccess] = useState(false);

  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      currentURL
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentURL
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      currentURL
    )}`,
    email: `mailto:?subject=${encodeURIComponent(
      `Check this out: ${title}`
    )}&body=${encodeURIComponent(currentURL)}`,
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset message after 2 seconds
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="flex gap-2 text-base text-neutral-500 bg-gray-100 px-6 rounded-md py-3 w-min">
      <button onClick={handleCopy}>
        {copySuccess ? (
          <FaCheck className="text-green-700" />
        ) : (
          <FaLink className="hover:text-blue-600" />
        )}
      </button>
      <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="hover:text-green-600" />
      </a>
      <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="hover:text-blue-500" />
      </a>
      <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
        <FaXTwitter className="hover:text-black" />
      </a>
      <a href={shareUrls.email} target="_blank" rel="noopener noreferrer">
        <FaEnvelope className="hover:text-neutral-700" />
      </a>
    </div>
  );
}
