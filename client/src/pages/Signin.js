import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div>
      <div className=" min-h-screen">
        <div className="flex flex-col font-roboto text-base text-neutral-600 w-80 sm:w-96 px-8 py-6 md:px-10 md:py-10 mx-auto mt-20 shadow-custom-indigo rounded">
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
          <form>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
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
            />
            <br />
            <button
              type="submit"
              className="font-medium text-midnight-indigo bg-neon-green w-full p-1.5 mb-4 border border-midnight-indigo hover:shadow-custom-indigo rounded"
            >
              Sign In
            </button>
            <button className="flex gap-1 justify-center font-medium w-full p-1.5 mb-4 border border-midnight-indigo hover:shadow-custom-indigo rounded">
              <img
                src="images/google.png"
                alt="Google logo"
                className="w-6 h-6"
              />
              <span>Google</span>
            </button>
            <div className="flex gap-1">
              <p>Already have an account?</p>
              <Link to={"/sign-up"}>
                <span className="text-cool-blue">Sign up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
