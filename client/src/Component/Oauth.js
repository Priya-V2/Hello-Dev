import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Oauth() {
  const handleGoogleLogin = () => {
    window.location.href =
      process.env.NODE_ENV === "production"
        ? process.env.GOOGLE_CALLBACK_URL
        : "http://localhost:5000/api/auth/google";
  };
  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex gap-1 justify-center font-medium w-full p-1.5 mb-4 border border-midnight-indigo hover:shadow-custom-indigo rounded"
    >
      <FcGoogle className="w-6 h-6" />
      <span>Continue with Google</span>
    </button>
  );
}
