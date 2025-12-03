import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import './Register.css';

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post('/users', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'Client'
            });

            toast.success("Account created successfully! Please log in.");
            navigate('/login');
        } catch (err) {
            toast.error("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        // Redirect browser to Backend Google Endpoint
        window.location.href = `${import.meta.env.VITE_API_URL}/login/google`;
    };

    return (
        <div className="register-page">
            <div className="register-container">
                {/* Left Side - Image */}
                <div className="register-image-section">
                    <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        className="register-image"
                        alt="Wedding"
                    />
                    <div className="register-image-overlay">
                        <div className="register-image-content">
                            <h2 className="register-image-title">Join VenueVibe Today</h2>
                            <p className="register-image-quote">"Find your perfect venue and create unforgettable memories."</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="register-form-section">
                    <div className="register-form-container">
                        <h2 className="register-form-title">Create Account</h2>
                        <p className="register-form-subtitle">Join thousands of happy event planners.</p>

                        {/* Google Button */}
                        <button
                            onClick={handleGoogleRegister}
                            className="login-google-button"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="login-google-icon" alt="Google" />
                            Continue with Google
                        </button>

                        <div className="login-divider">
                            <div className="login-divider-line"></div>
                            <span className="login-divider-text">Or create with email</span>
                            <div className="login-divider-line"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="register-form">
                            <div className="register-form-group">
                                <label className="register-form-label">Username</label>
                                <div className="register-form-input-wrapper">
                                    <User className="register-form-icon" />
                                    <input
                                        type="text"
                                        required
                                        className="register-form-input"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="register-form-group">
                                <label className="register-form-label">Email</label>
                                <div className="register-form-input-wrapper">
                                    <Mail className="register-form-icon" />
                                    <input
                                        type="email"
                                        required
                                        className="register-form-input"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="register-form-group">
                                <label className="register-form-label">Password</label>
                                <div className="register-form-input-wrapper">
                                    <Lock className="register-form-icon" />
                                    <input
                                        type="password"
                                        required
                                        className="register-form-input"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="register-form-group">
                                <label className="register-form-label">Confirm Password</label>
                                <div className="register-form-input-wrapper">
                                    <Lock className="register-form-icon" />
                                    <input
                                        type="password"
                                        required
                                        className="register-form-input"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="register-submit-button"
                            >
                                {loading ? "Creating account..." : "Create Account"} <ArrowRight className="register-submit-icon" />
                            </button>
                        </form>

                        <p className="register-footer">
                            Already have an account?
                            <Link to="/login" className="register-footer-link">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;