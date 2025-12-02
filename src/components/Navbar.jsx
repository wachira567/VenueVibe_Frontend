import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, User, Heart, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* LOGO */}
                    <Link to="/" className="text-2xl font-black text-indigo-900 tracking-tighter">
                        Venue<span className="text-indigo-600">Vibe</span>
                    </Link>

                    {/* DESKTOP LINKS */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition">Home</Link>
                        <Link to="/venues" className="text-gray-600 hover:text-indigo-600 font-medium transition">Venues</Link>
                        <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium transition">Contact</Link>
                    </div>

                    {/* AUTH BUTTONS */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                {user.role === 'Admin' ? (
                                    <Link to="/admin" className="flex items-center gap-2 text-red-600 font-bold bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition">
                                        <LayoutDashboard size={18} /> Admin Panel
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/saved" title="Saved Venues" className="text-gray-400 hover:text-pink-500 transition">
                                            <Heart size={24} />
                                        </Link>
                                        <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 font-medium hover:text-indigo-600 transition">
                                            <User size={20} /> My Account
                                        </Link>
                                    </>
                                )}

                                <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600" title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Log In</Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 transition transform hover:-translate-y-0.5">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block py-3 text-gray-600 font-medium border-b border-gray-50">Home</Link>
                        <Link to="/venues" onClick={() => setIsOpen(false)} className="block py-3 text-gray-600 font-medium border-b border-gray-50">Venues</Link>

                        {!user && (
                            <div className="pt-4 flex flex-col gap-3">
                                <Link to="/login" className="w-full text-center py-3 border border-gray-200 rounded-lg font-bold text-gray-700">Log In</Link>
                                <Link to="/register" className="w-full text-center py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md">Sign Up</Link>
                            </div>
                        )}

                        {user && (
                            <div className="pt-2">
                                {user.role === 'Admin' ? (
                                    <Link to="/admin" className="block w-full text-center py-3 bg-red-100 text-red-700 font-bold rounded-lg mb-2">Access Admin Panel</Link>
                                ) : (
                                    <Link to="/dashboard" className="block w-full text-center py-3 bg-gray-100 text-gray-700 font-bold rounded-lg mb-2">My Account</Link>
                                )}
                                <button onClick={handleLogout} className="w-full text-center py-3 text-red-500 font-medium">Log Out</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;