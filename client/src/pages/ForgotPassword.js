import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpField, setOtpField] = useState(false);
  const ctaColor = loading ? "bg-neon-green-tint" : "bg-neon-green";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId }),
      });
      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        return setOtpField(true);
      } else {
        return setErrorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error.message);
    }
  };

  const handleOTPCheck = async (e) => {
    e.preventDefault();
    console.log(otp);
    try {
      setLoading(true);
      const res = await fetch("/api/auth/check-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        return navigate("/reset-password");
      } else {
        setLoading(false);
        return setErrorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
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
        {errorMessage && (
          <div className="text-red-700 bg-red-100 mb-2 p-2 rounded-sm font-medium text-center">
            <span>{errorMessage}</span>
          </div>
        )}
        {otpField ? (
          <form onSubmit={handleOTPCheck}>
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
            <br />
            <label htmlFor="otp">OTP:</label>
            <br />
            <input
              type="text"
              name="otp"
              id="otp"
              placeholder="Your OTP please"
              required
              className="w-full p-2 mt-1 mb-6 border-2 rounded focus:outline-none focus:border-cool-blue"
              onChange={(e) => setOtp(e.target.value)}
            />
            <p className="mb-4">Please enter the received OTP above</p>
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
                "Verify OTP"
              )}
            </button>
            <br />
          </form>
        ) : (
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
            <p className="mb-4">You'll receive an email with the OTP</p>
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
        )}
      </div>
    </div>
  );
}
