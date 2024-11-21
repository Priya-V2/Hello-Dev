import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ctaColor = loading ? "bg-neon-green-tint" : "bg-neon-green";
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        navigate("/sign-in");
      } else {
        setLoading(false);
        setError(data.message);
        alert("Failed to reset the password.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <div className="font-roboto text-sm sm:text-base text-neutral-600 w-72 sm:w-96 px-8 py-6 md:px-10 md:py-8 mx-auto mt-12 shadow-custom-indigo rounded">
        <img
          src="/images/logo-midnight-indigo.png"
          alt="Hello dev logo"
          className="w-48 lg:w-56 mb-6 mx-auto"
        />
        {error && (
          <div className=" text-red-700 bg-red-100 mb-2 p-2 rounded-sm font-medium text-center">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Please enter your mail id here"
            required
            className="w-full p-2 mt-1 mb-5 border-2 rounded focus:outline-none focus:border-cool-blue"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="New Password"
            required
            className="w-full p-2 mt-1 mb-5 border-2 rounded focus:outline-none focus:border-cool-blue"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full p-2 mt-1 mb-6 border-2 rounded focus:outline-none focus:border-cool-blue"
            onChange={handleChange}
          />
          <br />
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
              "Reset Password"
            )}
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
