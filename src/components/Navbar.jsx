import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Home, MapPin, Info, Phone, User, Heart, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { cn } from '../utils/utils';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Get current active tab based on pathname
    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/') return 'Home';
        if (path === '/venues') return 'Venues';
        if (path === '/about') return 'About';
        if (path === '/contact') return 'Contact';
        if (path === '/dashboard') return 'Account';
        if (path === '/admin') return 'Admin';
        return 'Home';
    };

    const [activeTab, setActiveTab] = useState(getActiveTab());

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Update active tab when location changes
    useEffect(() => {
        setActiveTab(getActiveTab());
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Navigation items for tubelight navbar
    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Venues', url: '/venues', icon: MapPin },
        { name: 'About', url: '/about', icon: Info },
        { name: 'Contact', url: '/contact', icon: Phone },
    ];

    // Add user-specific items
    if (user) {
        if (user.role === 'Admin') {
            navItems.push({ name: 'Admin', url: '/admin', icon: LayoutDashboard });
        } else {
            navItems.push({ name: 'Account', url: '/dashboard', icon: User });
        }
    }

    return (
        <>
            {/* Tubelight Navbar */}
            <div
                className={cn(
                    "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
                )}
            >
                <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.name;

                        return (
                            <Link
                                key={item.name}
                                to={item.url}
                                onClick={() => setActiveTab(item.name)}
                                className={cn(
                                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                                    "text-foreground/80 hover:text-primary",
                                    isActive && "bg-muted text-primary",
                                )}
                            >
                                <span className="hidden md:inline">{item.name}</span>
                                <span className="md:hidden">
                                    <Icon size={18} strokeWidth={2.5} />
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="lamp"
                                        className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    >
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                                            <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                                            <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                                            <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                                        </div>
                                    </motion.div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Auth Menu (only on mobile when user is logged in) */}
            {isMobile && user && (
                <div className="fixed top-4 right-4 z-40">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-200"
                    >
                        <User size={20} className="text-gray-700" />
                    </button>

                    {isOpen && (
                        <div className="absolute top-16 right-0 bg-white rounded-xl shadow-xl border border-gray-200 p-4 min-w-48">
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <span className="text-indigo-600 font-bold text-sm">
                                        {user.username.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{user.username}</p>
                                    <p className="text-sm text-gray-500">{user.role}</p>
                                </div>
                            </div>

                            {user.role !== 'Admin' && (
                                <Link
                                    to="/saved"
                                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Heart size={18} />
                                    <span>Saved Venues</span>
                                </Link>
                            )}

                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition w-full text-left text-red-600"
                            >
                                <LogOut size={18} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Desktop Auth Section (top right) */}
            {!isMobile && user && (
                <div className="fixed top-6 right-6 z-40 flex items-center gap-4">
                    {user.role === 'Admin' ? (
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 text-red-600 font-bold bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition"
                        >
                            <LayoutDashboard size={18} /> Admin Panel
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/saved"
                                title="Saved Venues"
                                className="text-gray-400 hover:text-pink-500 transition p-2 rounded-full hover:bg-white/50"
                            >
                                <Heart size={24} />
                            </Link>
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2 text-gray-700 font-medium hover:text-indigo-600 transition p-2 rounded-full hover:bg-white/50"
                            >
                                <User size={20} /> My Account
                            </Link>
                        </>
                    )}

                    <button
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-white/50"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            )}

            {/* Desktop Auth Section (when not logged in) */}
            {!isMobile && !user && (
                <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
                    <Link
                        to="/login"
                        className="text-gray-600 hover:text-indigo-600 font-medium px-4 py-2 rounded-full hover:bg-white/50 transition"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/register"
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 transition transform hover:-translate-y-0.5"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </>
    );
};

export default Navbar;