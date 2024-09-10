import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser, loading } = useSelector((store) => store.user);

  return (
    <div className="font-roboto text-base text-dark-charcoal max-w-sm lg:max-w-lg mx-auto w-full">
      <h1 className="font-medium text-2xl text-center my-6">Profile</h1>
      <form className="flex flex-col">
        <div className="self-center mb-6">
          <img
            src={currentUser.profilePicture}
            alt="User image"
            className="w-24 h-24 rounded-full shadow-custom-indigo mx-auto cursor-pointer"
          />
        </div>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 mt-1 mb-2 border-2 rounded focus:outline-none focus:border-cool-blue"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Reset Password"
          className="w-full p-2 mt-1 mb-6 border-2 rounded focus:outline-none focus:border-cool-blue"
        />
        <button
          type="submit"
          className={`font-medium text-midnight-indigo bg-neon-green w-full p-1.5 mb-4 border border-midnight-indigo hover:shadow-custom-indigo rounded cursor-pointer`}
          disabled={loading}
        >
          Save
        </button>
      </form>
      <div className="flex justify-between text-fail-red">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
