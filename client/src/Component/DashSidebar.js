import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUserSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutUserSuccess());
        return navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="font-roboto w-full md:w-56 text-dark-charcoal bg-midnight-indigo min-h-max md:min-h-screen border-b-2 p-4 md:p-2 md:pt-3 rounded-sm">
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
          <span className="text-base font-medium" onClick={handleSignout}>
            Sign out
          </span>
        </div>
      </div>
    </div>
  );
}
