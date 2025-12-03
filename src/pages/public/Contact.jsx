import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Calendar } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-header">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtitle">
                        Have questions about booking a venue or need help with your event planning?
                        We're here to help you create unforgettable experiences.
                    </p>
                </div>

                <div className="contact-content">
                    {/* Contact Info */}
                    <div className="contact-info-section">
                        {/* Contact Methods */}
                        <div className="contact-info-card">
                            <h2 className="contact-info-title">Get in Touch</h2>

                            <div className="contact-info-list">
                                <div className="contact-info-item">
                                    <div className="contact-info-icon-wrapper">
                                        <Phone className="contact-info-icon" />
                                    </div>
                                    <div className="contact-info-content">
                                        <h3>Phone</h3>
                                        <p>+254 700 000 000</p>
                                        <p>Mon-Fri 9AM-6PM EAT</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon-wrapper">
                                        <Mail className="contact-info-icon" />
                                    </div>
                                    <div className="contact-info-content">
                                        <h3>Email</h3>
                                        <p>support@venuevibe.co.ke</p>
                                        <p>We respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon-wrapper">
                                        <MapPin className="contact-info-icon" />
                                    </div>
                                    <div className="contact-info-content">
                                        <h3>Office</h3>
                                        <p>Westlands, Nairobi, Kenya</p>
                                        <p>Visit us for venue tours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="business-hours-card">
                            <h2 className="business-hours-title">Business Hours</h2>

                            <div className="business-hours-list">
                                <div className="business-hours-item">
                                    <span className="business-hours-day">Monday - Friday</span>
                                    <span className="business-hours-time">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="business-hours-item">
                                    <span className="business-hours-day">Saturday</span>
                                    <span className="business-hours-time">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="business-hours-item">
                                    <span className="business-hours-day">Sunday</span>
                                    <span className="business-hours-time">Closed</span>
                                </div>
                            </div>

                            <div className="emergency-support">
                                <div className="emergency-support-header">
                                    <Clock className="emergency-support-icon" />
                                    <span>Emergency Support</span>
                                </div>
                                <p className="emergency-support-text">24/7 for urgent booking issues</p>
                            </div>
                        </div>
                    </div>

                    {/* Alternative Contact Methods */}
                    <div className="contact-info-section">
                        <div className="alternative-contact">
                            <h2 className="alternative-contact-title">Alternative Ways to Reach Us</h2>
                            <p className="alternative-contact-text">
                                Prefer a different method of communication? Choose from our alternative contact options below.
                            </p>

                            <div className="alternative-contact-methods">
                                <a
                                    href="https://wa.me/254700000000"
                                    className="alternative-contact-button"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="alternative-contact-icon" />
                                    WhatsApp Chat
                                </a>

                                <a
                                    href="tel:+254700000000"
                                    className="alternative-contact-button"
                                >
                                    <Phone className="alternative-contact-icon" />
                                    Direct Call
                                </a>

                                <a
                                    href="mailto:support@venuevibe.co.ke"
                                    className="alternative-contact-button"
                                >
                                    <Mail className="alternative-contact-icon" />
                                    Email Us
                                </a>

                                <a
                                    href="/venues"
                                    className="alternative-contact-button"
                                >
                                    <Calendar className="alternative-contact-icon" />
                                    Book Online
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;