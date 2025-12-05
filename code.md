# VenueVibe Frontend Code - GitHub Repository Contents

## 📁 Repository Structure

```
Frontend_VenueVibe/
├── .env
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── api/
    │   └── axios.js
    ├── assets/
    │   └── react.svg
    ├── components/
    │   ├── Footer.css
    │   ├── Footer.jsx
    │   ├── Navbar.css
    │   ├── Navbar.jsx
    │   ├── ProfileEditModal.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── TawkToChat.css
    │   ├── TawkToChat.jsx
    │   └── WhatsAppFloat.jsx
    ├── context/
    │   └── AuthContext.jsx
    └── pages/
        ├── admin/
        │   └── AdminDashboard.jsx
        └── client/
            ├── AccountSettings.css
            ├── AccountSettings.jsx
            ├── ClientDashboard.jsx
            ├── Invoices.css
            ├── Invoices.jsx
            ├── Messages.css
            ├── Messages.jsx
            ├── MyBookings.css
            ├── MyBookings.jsx
            ├── ProfileEdit.css
            ├── ProfileEdit.jsx
            ├── SavedVenues.css
            └── SavedVenues.jsx
        └── public/
            ├── About.css
            ├── About.jsx
            ├── Contact.css
            ├── Contact.jsx
            ├── GoogleCallback.jsx
            ├── Home.css
            ├── Home.jsx
            ├── Login.css
            ├── Login.jsx
            ├── Register.css
            ├── Register.jsx
            ├── VenueDetails.css
            ├── VenueDetails.jsx
            ├── VenueList.css
            └── VenueList.jsx
```

---

## ⚙️ Configuration Files

### vercel.json

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### package.json

```json
{
  "name": "venue-vibe-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.7",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "react-toastify": "^10.0.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.0"
  }
}
```

### vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

### .env

```
VITE_API_URL=https://venuevibe-backend.onrender.com
VITE_FRONTEND_URL=https://venue-vibe-frontend-dnazcszbw-washiras-projects-fb5072e5.vercel.app
VITE_TAWK_PROPERTY_ID=69300fe314301c197e20f629
VITE_TAWK_WIDGET_ID=1jbhrs53g
VITE_GOOGLE_CLIENT_ID=493499409992-q4pg6rj57o33eot4f52bgopo4r0k8o60.apps.googleusercontent.com
GOOGLE_CLIENT_ID=493499409992-q4pg6rj57o33eot4f52bgopo4r0k8o60.apps.googleusercontent.com
```

---

## 🚀 Main Application Files

### src/main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### src/App.jsx

```jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ProtectedRoute from "./components/ProtectedRoute";
import TawkToChat from "./components/TawkToChat";

// Pages - Lazy load for better performance
const Home = lazy(() => import("./pages/public/Home"));
const About = lazy(() => import("./pages/public/About"));
const Contact = lazy(() => import("./pages/public/Contact"));
const VenueList = lazy(() => import("./pages/public/VenueList"));
const VenueDetails = lazy(() => import("./pages/public/VenueDetails"));
const Login = lazy(() => import("./pages/public/Login"));
const Register = lazy(() => import("./pages/public/Register"));
const GoogleCallback = lazy(() => import("./pages/public/GoogleCallback"));

const ClientDashboard = lazy(() => import("./pages/client/ClientDashboard"));
const MyBookings = lazy(() => import("./pages/client/MyBookings"));
const SavedVenues = lazy(() => import("./pages/client/SavedVenues"));
const AccountSettings = lazy(() => import("./pages/client/AccountSettings"));
const ProfileEdit = lazy(() => import("./pages/client/ProfileEdit"));
const Messages = lazy(() => import("./pages/client/Messages"));
const Invoices = lazy(() => import("./pages/client/Invoices"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

// Component to handle page padding
function PageWrapper({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return <div className={isHomePage ? "" : "pt-20"}>{children}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="bottom-right" />

        {/* The Navbar lives outside Routes so it's always visible (except admin maybe) */}
        <Navbar />

        <PageWrapper>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            }
          >
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/venues" element={<VenueList />} />
              <Route path="/venues/:id" element={<VenueDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/google-callback" element={<GoogleCallback />} />

              {/* CLIENT ROUTES (User Only) */}
              <Route
                element={<ProtectedRoute allowedRoles={["Client", "Admin"]} />}
              >
                <Route path="/dashboard/bookings" element={<MyBookings />} />
                <Route path="/dashboard/saved" element={<SavedVenues />} />
                <Route
                  path="/dashboard/settings"
                  element={<AccountSettings />}
                />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/dashboard/messages" element={<Messages />} />
                <Route path="/dashboard/invoices" element={<Invoices />} />
              </Route>

              {/* GOD MODE (Admin Only) */}
              <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </Suspense>
        </PageWrapper>

        {/* Footer */}
        <Footer />
        {/* Global Floating WhatsApp Button */}
        <WhatsAppFloat />

        {/* Tawk.to Chat Widget */}
        <TawkToChat />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

---

## 🔐 Authentication System

### src/api/axios.js

```javascript
import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(
      "Axios interceptor: Error response",
      error.response?.status,
      error.response?.config?.url
    );
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log("Axios interceptor: Clearing token due to 401");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user_id");
      window.location.href = "/login";
    } else if (error.response?.status === 422) {
      // Unprocessable entity - check if it's auth-related
      console.log(
        "Axios interceptor: 422 error details:",
        error.response?.data
      );
      // For now, don't auto-clear on 422 - might be validation errors
    }
    return Promise.reject(error);
  }
);

export default api;
```

### src/context/AuthContext.jsx

```jsx
import { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContext: Initializing auth check");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("user_id");

    console.log(
      "AuthContext: Stored values - token:",
      !!token,
      "role:",
      role,
      "userId:",
      userId
    );

    if (token && role && userId) {
      try {
        const decoded = jwtDecode(token);
        console.log("AuthContext: Decoded token:", decoded);
        // Check expiry
        if (decoded.exp * 1000 < Date.now()) {
          console.log("AuthContext: Token expired, logging out");
          logout();
        } else {
          console.log("AuthContext: Token valid, setting user");
          setUser({
            username: "User", // We'll get the real username from /users/me
            role: role,
            id: userId,
          });
        }
      } catch (e) {
        console.log("AuthContext: Token decode failed:", e);
        // Only logout if we don't already have a user (prevent HMR clearing valid sessions)
        if (!user) {
          logout();
        }
      }
    } else {
      console.log("AuthContext: Missing stored auth data");
      // Only clear user if we have one (prevent unnecessary state changes on HMR)
      if (user) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []); // Keep empty dependency array to only run on mount

  const login = useCallback((token, role, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user_id", id);
    setUser({ username: "User", role, id }); // Username will be updated when we fetch user data
  }, []);

  const logout = useCallback(() => {
    console.log("AuthContext: Logout called");
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
```

---

## 🔑 Google OAuth Components

### src/pages/public/Login.jsx (Google Login Trigger)

```jsx
const handleGoogleLogin = () => {
  // Redirect browser to Backend Google Endpoint
  window.location.href = `${import.meta.env.VITE_API_URL}/login/google`;
};
```

### src/pages/public/GoogleCallback.jsx

```jsx
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
```

---

## 🏗️ Component Structure

### src/components/ProtectedRoute.jsx

```jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login with the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User doesn't have permission
    return <Navigate to="/venues" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

---

## 📄 HTML Entry Point

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VenueVibe - Find Your Perfect Event Space</title>
    <meta
      name="description"
      content="Discover and book amazing venues for your weddings, corporate events, and special occasions in Kenya."
    />
    <meta
      name="keywords"
      content="venues, event spaces, weddings, corporate events, Kenya"
    />
    <meta name="author" content="VenueVibe" />

    <!-- Open Graph Meta Tags -->
    <meta
      property="og:title"
      content="VenueVibe - Find Your Perfect Event Space"
    />
    <meta
      property="og:description"
      content="Discover and book amazing venues for your weddings, corporate events, and special occasions in Kenya."
    />
    <meta
      property="og:image"
      content="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
    />
    <meta property="og:url" content="https://venue-vibe-frontend.vercel.app" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="VenueVibe - Find Your Perfect Event Space"
    />
    <meta
      name="twitter:description"
      content="Discover and book amazing venues for your weddings, corporate events, and special occasions in Kenya."
    />
    <meta
      name="twitter:image"
      content="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 🎨 Styling

### src/index.css (Global Styles)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Focus styles for accessibility */
.focus\:ring-blue-500:focus {
  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

---

## 📋 Essential Files Checklist

### ✅ Must be in GitHub Repository:

- [x] `vercel.json` (SPA routing)
- [x] `package.json` (dependencies)
- [x] `src/App.jsx` (routing)
- [x] `src/pages/public/GoogleCallback.jsx` (OAuth callback)
- [x] `src/api/axios.js` (API configuration)
- [x] `src/context/AuthContext.jsx` (authentication)
- [x] `src/components/ProtectedRoute.jsx` (route protection)
- [x] `src/pages/public/Login.jsx` (Google login trigger)

### 🔍 Check These for Errors:

1. **Environment Variables** in Vercel match `.env`
2. **Vercel Root Directory** is empty (not `Frontend_VenueVibe`)
3. **vercel.json** exists at repository root
4. **All imports** in components are correct
5. **API URLs** point to Render backend

### 🚨 Common Issues:

- Missing `vercel.json`
- Wrong Vercel root directory
- Environment variables not set in Vercel
- API URL pointing to wrong backend
- Missing route in `App.jsx`

---

## 🔧 Quick Debug Commands

```bash
# Check if vercel.json exists
ls -la vercel.json

# Check environment variables
echo $VITE_API_URL

# Test API connection
curl https://venuevibe-backend.onrender.com/venues

# Check Vercel deployment
# Visit: https://vercel.com/dashboard
```

This comprehensive code.md file contains all the frontend code that should be in your GitHub repository. Compare this with what's actually deployed to identify any missing or incorrect files.
