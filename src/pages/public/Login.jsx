import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/dashboard'; // Redirect back to venue or dashboard

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Use FormData for OAuth2 standard (FastAPI expects form-data)
        const payload = new FormData();
        payload.append('username', formData.username);
        payload.append('password', formData.password);

        try {
            const res = await api.post('/token', payload);
            // Login function from Context
            login(res.data.access_token, res.data.role, res.data.user_id);
            toast.success("Welcome back!");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect browser to Backend Google Endpoint
        window.location.href = `${import.meta.env.VITE_API_URL}/login/google`;
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Left Side - Image */}
                <div className="login-image-section">
                    <img
                        src="https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        className="login-image"
                        alt="Event"
                    />
                    <div className="login-image-overlay">
                        <div className="login-image-content">
                            <h2 className="login-image-title">Welcome Back to VenueVibe</h2>
                            <p className="login-image-quote">"The only platform where I found my dream wedding venue in under 10 minutes."</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="login-form-section">
                    <div className="login-form-container">
                        <h2 className="login-form-title">Sign In</h2>
                        <p className="login-form-subtitle">Access your bookings and saved venues.</p>

                        {/* Google Button */}
                        <button
                            onClick={handleGoogleLogin}
                            className="login-google-button"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="login-google-icon" alt="Google" />
                            Continue with Google
                        </button>

                        <div className="login-divider">
                            <div className="login-divider-line"></div>
                            <span className="login-divider-text">Or with email</span>
                            <div className="login-divider-line"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="login-form-group">
                                <label className="login-form-label">Username</label>
                                <div className="login-form-input-wrapper">
                                    <Mail className="login-form-icon" />
                                    <input
                                        type="text"
                                        required
                                        className="login-form-input"
                                        placeholder="Enter your username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="login-form-group">
                                <label className="login-form-label">Password</label>
                                <div className="login-form-input-wrapper">
                                    <Lock className="login-form-icon" />
                                    <input
                                        type="password"
                                        required
                                        className="login-form-input"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="login-submit-button"
                            >
                                {loading ? "Signing in..." : "Sign In"} <ArrowRight className="login-submit-icon" />
                            </button>
                        </form>

                        <p className="login-footer">
                            Don't have an account?
                            <Link to="/register" className="login-footer-link">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;