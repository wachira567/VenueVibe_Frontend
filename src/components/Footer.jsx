import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-decoration-1"></div>
            <div className="footer-decoration-2"></div>

            <div className="footer-content">
                {/* Brand */}
                <div className="footer-section">
                    <div className="footer-brand">
                        <h3 className="footer-logo">Venue<span className="footer-logo-accent">Vibe</span></h3>
                        <p className="footer-description">
                            Premium booking platform for Kenyan event spaces. Weddings, Corporate Events, Conferences - verified and secure.
                        </p>
                        <div className="footer-social">
                            <a href="#" className="footer-social-link"><Instagram size={20}/></a>
                            <a href="#" className="footer-social-link"><Facebook size={20}/></a>
                            <a href="#" className="footer-social-link"><Twitter size={20}/></a>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h4>Explore</h4>
                    <ul className="footer-links">
                        <li><Link to="/venues" className="footer-link">Browse Venues</Link></li>
                        <li><Link to="/about" className="footer-link">How it Works</Link></li>
                        <li><Link to="/contact" className="footer-link">List Your Property</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <ul className="footer-links">
                        <li className="footer-contact-item">
                            <Phone size={18} className="footer-contact-icon"/>
                            +254 700 000 000
                        </li>
                        <li className="footer-contact-item">
                            <Mail size={18} className="footer-contact-icon"/>
                            support@venuevibe.co.ke
                        </li>
                        <li className="footer-contact-item">
                            <MapPin size={18} className="footer-contact-icon"/>
                            Westlands, Nairobi
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul className="footer-links">
                        <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
                        <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                        <li><Link to="/admin" className="footer-admin-link">Admin Access</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} VenueVibe Ltd. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;