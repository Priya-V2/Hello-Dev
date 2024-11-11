import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuthCallbackHandler() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_NODE_ENVV === "production"
              ? "https://hello-dev.onrender.com/api/auth/check"
              : "http://localhost:5000/api/auth/check"
          }`,
          {
            credentials: "include", // To send cookies with the request
          }
        );

        if (response.ok) {
          const data = await response.json();
          dispatch(signInSuccess(data.user)); // Update Redux state with user data
          navigate("/"); // Redirect to home or a different page after successful login
        } else {
          console.error("Failed to handle OAuth callback");
          navigate("/sign-in"); // Redirect in case of failure
        }
      } catch (error) {
        console.error("Error handling OAuth callback", error);
        navigate("/sign-in"); // Redirect in case of error
      }
    };

    handleOAuthCallback();
  }, [dispatch, navigate]);

  return null;
}
