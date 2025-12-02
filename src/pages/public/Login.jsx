import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { Mail, Lock, ArrowRight } from 'lucide-react';

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
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Side - Image */}
            <div className="hidden lg:block w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Event"
                />
                <div className="absolute inset-0 bg-indigo-900/60 flex items-center justify-center p-12">
                    <div className="text-white max-w-lg">
                        <h2 className="text-4xl font-bold mb-6">Welcome Back to VenueVibe</h2>
                        <p className="text-lg text-indigo-100">"The only platform where I found my dream wedding venue in under 10 minutes."</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                    <p className="text-gray-500 mb-8">Access your bookings and saved venues.</p>

                    {/* Google Button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition mb-6"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
                        Continue with Google
                    </button>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or with email</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="text-gray-400" size={20}/>
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-gray-400" size={20}/>
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition flex justify-center items-center gap-2"
                        >
                            {loading ? "Signing in..." : "Sign In"} <ArrowRight size={20}/>
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-600">
                        Don't have an account?
                        <Link to="/register" className="text-indigo-600 font-bold ml-1 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;