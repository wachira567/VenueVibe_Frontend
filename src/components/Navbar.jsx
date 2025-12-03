import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Home, MapPin, Info, Phone, User, Heart, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { cn } from '../utils/utils';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext) || {};
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    // Get current active tab based on pathname
    const getActiveTab = () => {
        const path = location.pathname;
        // Don't highlight any nav items on auth pages
        if (path === '/login' || path === '/register') return null;
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

    // Scroll detection for navbar visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
                // Scrolling down and past 10px
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            {/* Enhanced Smart Navbar */}
            <motion.div
                className={cn("navbar-container", isVisible ? "navbar-visible" : "navbar-hidden")}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="navbar-wrapper">
                    {/* Logo/Brand */}
                    <div className="navbar-brand">
                        <div className="navbar-logo">
                            <span className="navbar-logo-text">V</span>
                        </div>
                        <span className="navbar-brand-text">VenueVibe</span>
                    </div>

                    {/* Navigation Items */}
                    <div className="navbar-nav">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.name;

                            return (
                                <Link
                                    key={item.name}
                                    to={item.url}
                                    onClick={() => setActiveTab(item.name)}
                                    className={cn("navbar-link", isActive && activeTab !== null && "navbar-link-active")}
                                >
                                    <Icon className="navbar-link-icon" />
                                    <span className="navbar-link-text">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons (when not logged in) */}
                    {!user && (
                        <div className="navbar-auth">
                            <Link
                                to="/login"
                                className="navbar-auth-link"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="navbar-auth-button"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>

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
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center;">
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

        </>
    );
};

export default Navbar;