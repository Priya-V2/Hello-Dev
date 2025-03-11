import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../Component/Oauth";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("EMAIL INPUT");
  const [otp, setOtp] = useState("");
  const ctaColor = loading ? "bg-neon-green-tint" : "bg-neon-green";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form === "EMAIL INPUT") {
      if (!formData.email) {
        return setErrorMessage("Please fill out all the fields");
      }

      try {
        setLoading(true);
        setErrorMessage(null);

        const res = await fetch("/api/auth/auth-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailId: formData.email }),
        });
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setLoading(false);
          return setForm("OTP VERIFICATION");
        } else {
          setLoading(false);
          return setErrorMessage(data.message);
        }
      } catch (error) {
        setLoading(false);
        return setErrorMessage(error.message);
      }
    }

    if (form === "OTP VERIFICATION") {
      if (!otp) {
        return setErrorMessage("Please fill  all the fields");
      }

      try {
        setLoading(true);
        setErrorMessage(null);

        const res = await fetch("/api/auth/check-signup-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailId: formData.email, otp }),
        });
        const data = await res.json();

        if (res.ok) {
          setLoading(false);
          return setForm("USER DETAILS");
        } else {
          setLoading(false);
          return setErrorMessage(data.message);
        }
      } catch (error) {
        setLoading(false);
        return setErrorMessage(error.message);
      }
    }

    if (form === "USER DETAILS") {
      if (!formData.username || !formData.password) {
        return setErrorMessage("Please fill out all the fields");
      }

      try {
        setLoading(true);
        setErrorMessage(null);
        const res = await fetch("api/auth/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          return setErrorMessage(data.message);
        }
        setLoading(false);

        if (res.ok) {
          setLoading(false);
          return navigate("/sign-in");
        }
      } catch (error) {
        setLoading(false);
        return setErrorMessage(error.message);
      }
    }
  };

  return (
    <div>
      <div className=" min-h-screen">
        <div className="flex flex-col font-roboto text-base text-neutral-600 w-80 sm:w-96 px-8 py-6 md:px-10 md:py-8 mx-auto mt-12 shadow-custom-indigo rounded">
          <Link to="/" className="self-center">
            <img
              src="/images/logo-midnight-indigo.png"
              alt="Hello dev logo"
              className="w-48 lg:w-56"
            />
          </Link>

          <p className="text-sm tracking-widest font-bold self-center mb-4">
            A Developer Guide for beginners
          </p>

          {errorMessage && (
            <div className="text-red-700 bg-red-100 mb-2 p-2 rounded-sm font-medium text-center">
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {form === "EMAIL INPUT" && (
              <>
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="w-full p-2 mt-1 mb-4 border-2 rounded focus:outline-none focus:border-cool-blue"
                  onChange={handleChange}
                />
                <br />
                <p className="mb-2">You'll receive an email with the OTP</p>
              </>
            )}

            {form !== "EMAIL INPUT" && (
              <>
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="w-full p-2 mt-1 mb-4 border-2 rounded focus:outline-none focus:border-cool-blue"
                  value={formData.email}
                  disabled
                />
                <br />
              </>
            )}

            {form === "OTP VERIFICATION" && (
              <>
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
              </>
            )}

            {form === "USER DETAILS" && (
              <>
                <label htmlFor="username">Username:</label>
                <br />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your Name"
                  className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
                  onChange={handleChange}
                />
                <br />

                <label htmlFor="password">Password:</label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your Password"
                  className="w-full p-2 mt-1 mb-6 border-2 rounded focus:outline-none focus:border-cool-blue"
                  onChange={handleChange}
                />
                <br />
              </>
            )}

            <button
              type="submit"
              className={`font-medium text-midnight-indigo ${ctaColor} w-full p-1.5 mb-3 border border-midnight-indigo hover:shadow-custom-indigo  rounded`}
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
              ) : form === "USER DETAILS" ? (
                "Sign up"
              ) : (
                "Continue"
              )}
            </button>

            <Oauth />
            <div className="flex gap-1">
              <span>Already have an account?</span>
              <Link to={"/sign-in"}>
                <span className="text-cool-blue">Sign in</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
