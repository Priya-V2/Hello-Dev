import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import Oauth from "../Component/Oauth";

export default function Signin() {
  const { loading, errorMessage } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const ctaColor = loading ? "bg-neon-green-tint" : "bg-neon-green";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        return navigate("/");
      }
    } catch (error) {
      console.error("Error during submission:", error.errorMessage);
      return dispatch(signInFailure(error.message));
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
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
              onChange={handleChange}
            />
            <br />
            {/* <div className="flex items-center justify-between"> */}
            <label htmlFor="password">Password:</label>
            {/* </div> */}
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
              onChange={handleChange}
            />
            <br />
            <a
              href="/forgot-password"
              className="text-cool-blue hover:text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
            <button
              type="submit"
              className={`font-medium text-midnight-indigo ${ctaColor} w-full p-1.5  my-4 border border-midnight-indigo hover:shadow-custom-indigo  rounded`}
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
                "Sign In"
              )}
            </button>
            <Oauth />
            <div className="flex gap-1 text-sm">
              <span>Don&apos;t have an account?</span>
              <Link to={"/sign-up"}>
                <span className="text-cool-blue">Sign Up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
