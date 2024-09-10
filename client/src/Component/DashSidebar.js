import { Link } from "react-router-dom";

export default function DashSidebar() {
  return (
    <div>
      <div className="font-roboto w-full md:w-56 text-dark-charcoal bg-midnight-indigo min-h-screen border-b-2 p-2 pt-3 rounded-sm">
        <div className="flex items-center gap-3 bg-alabaster mb-2 p-2 rounded cursor-pointer">
          <img
            src="/images/user-dark-charcoal.png"
            alt="User Icon"
            className="w-6 h-6"
          />
          <span className="text-base font-medium">Profile</span>
          <span className="text-xs ml-auto text-white bg-dark-charcoal px-3 py-1 rounded">
            User
          </span>
        </div>
        <div className="flex items-center gap-3 bg-alabaster p-2 rounded cursor-pointer">
          <img src="/images/sign-out.png" alt="User Icon" className="w-6 h-6" />
          <span className="text-base font-medium">Sign out</span>
        </div>
      </div>
    </div>
  );
}
