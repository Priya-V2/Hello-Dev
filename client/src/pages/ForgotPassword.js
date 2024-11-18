import { useState } from "react";
import { useSelector } from "react-redux";

export default function ForgotPassword() {
  const { loading } = useSelector((store) => store.user);
  const ctaColor = loading ? "bg-neon-green-tint" : "bg-neon-green";
  const [emailId, setEmailId] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId }),
      });

      if (res.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="font-roboto text-base text-neutral-600 w-80 sm:w-96 px-8 py-6 md:px-10 md:py-8 mx-auto mt-12 shadow-custom-indigo rounded">
        <p className="text-center mb-4">Please enter your mail id below</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <button
            type="submit"
            className={`font-medium text-midnight-indigo ${ctaColor} w-full p-1.5 mt-6 border border-midnight-indigo hover:shadow-custom-indigo  rounded`}
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
