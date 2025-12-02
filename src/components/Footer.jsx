import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                {/* Brand */}
                <div>
                    <h3 className="text-2xl font-black text-white mb-6">Venue<span className="text-indigo-500">Vibe</span></h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        Premium booking platform for Kenyan event spaces. Weddings, Ruracios, Conferences - verified and secure.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-indigo-400 transition"><Instagram size={20}/></a>
                        <a href="#" className="hover:text-indigo-400 transition"><Facebook size={20}/></a>
                        <a href="#" className="hover:text-indigo-400 transition"><Twitter size={20}/></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Explore</h4>
                    <ul className="space-y-4">
                        <li><Link to="/venues" className="hover:text-white transition">Browse Venues</Link></li>
                        <li><Link to="/about" className="hover:text-white transition">How it Works</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition">List Your Property</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex items-center gap-3"><Phone size={18} className="text-indigo-500"/> +254 700 000 000</li>
                        <li className="flex items-center gap-3"><Mail size={18} className="text-indigo-500"/> support@venuevibe.co.ke</li>
                        <li className="flex items-center gap-3"><MapPin size={18} className="text-indigo-500"/> Westlands, Nairobi</li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
                    <ul className="space-y-4">
                        <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                        <li><Link to="/admin" className="text-gray-600 hover:text-gray-500 text-sm">Admin Access</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} VenueVibe Ltd. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;