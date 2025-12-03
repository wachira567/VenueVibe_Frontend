import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import api from "../../api/axios";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const handleCallback = async () => {
      console.log("GoogleCallback: Starting callback handling");
      try {
        const token = searchParams.get("token");
        const role = searchParams.get("role");
        console.log("GoogleCallback: Received token:", !!token, "role:", role);

        if (token && role) {
          console.log("GoogleCallback: Fetching user data from /users/me");
          // First, get the user details to get the user ID
          // Temporarily set the token for this request
          localStorage.setItem("token", token);
          const userResponse = await api.get("/users/me");

          console.log(
            "GoogleCallback: /users/me response status:",
            userResponse.status
          );

          if (userResponse.status === 200) {
            const userData = userResponse.data;
            console.log("GoogleCallback: User data received:", userData);

            // Store the token, role, and user ID in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("user_id", userData.id);
            console.log("GoogleCallback: Stored auth data in localStorage");

            // Update auth context
            login(token, role, userData.id);
            console.log("GoogleCallback: Updated auth context");

            // Google login successful - no notification needed

            // Auto-redirect based on user role
            setTimeout(() => {
              if (role === "Admin") {
                console.log("GoogleCallback: Redirecting admin to /dashboard");
                navigate("/dashboard");
              } else {
                console.log("GoogleCallback: Redirecting user to /venues");
                navigate("/venues");
              }
            }, 1500);
          } else {
            console.log(
              "GoogleCallback: Failed to get user data, status:",
              userResponse.status
            );
            throw new Error("Failed to get user data");
          }
        } else {
          console.log("GoogleCallback: Missing token or role");
          // No toast notification for Google login errors
          navigate("/login");
        }
      } catch (error) {
        console.error("Google callback error:", error);
        // No toast notification for Google login errors
        navigate("/login");
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing Google login...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
