import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check expiry
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser({
                        username: decoded.sub,
                        role: localStorage.getItem("role"),
                        id: localStorage.getItem("user_id")
                    });
                }
            } catch (e) { logout(); }
        }
        setLoading(false);
    }, []);

    const login = (token, role, id) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user_id", id);
        const decoded = jwtDecode(token);
        setUser({ username: decoded.sub, role, id });
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};