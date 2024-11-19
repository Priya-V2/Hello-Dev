import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { loading } = useSelector((store) => store.user);
  const ctaColor = loading ? "bg-neon-green-tint" : "bg-neon-green";
  const [emailId, setEmailId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId }),
      });

      if (res.ok) {
        console.log(res);
        navigate("/reset-password");
      } else {
        console.log(res);
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="font-roboto text-sm sm:text-base text-neutral-600 w-72 sm:w-96 px-8 py-6 md:px-10 md:py-8 mx-auto mt-12 shadow-custom-indigo rounded">
        <img
          src="/images/logo-midnight-indigo.png"
          alt="Hello dev logo"
          className="w-48 lg:w-56 mb-6 mx-auto"
        />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Please enter your mail id here"
            required
            className="w-full p-2 mt-1 mb-6 border-2 rounded focus:outline-none focus:border-cool-blue"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <p className="mb-4">You'll receive an email with the OTP.</p>
          <button
            type="submit"
            className={`font-medium text-midnight-indigo ${ctaColor} w-full p-1.5 border border-midnight-indigo hover:shadow-custom-indigo  rounded`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-4 w-4 text-midnight-indigo border-4 border-t-transparent border-midnight-indigo rounded-full justify-items-center"
                  viewBox="0 0 24 24"
                  style={{ borderWidth: "3px" }}
                ></svg>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              "Send Email"
            )}
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
