import { CheckCircle, Users, MapPin, Award } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <div className="about-hero">
                <div className="about-hero-content">
                    <h1 className="about-hero-title">About VenueVibe</h1>
                    <p className="about-hero-subtitle">
                        Kenya's premier event venue booking platform, connecting event planners with the perfect spaces for unforgettable moments.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="about-mission">
                <div className="about-mission-content">
                    <div className="about-mission-header">
                        <h2 className="about-mission-title">Our Mission</h2>
                        <p className="about-mission-description">
                            To simplify event planning by providing a seamless platform where venue owners and event organizers can connect,
                            ensuring every celebration, conference, and gathering finds its perfect home.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="about-stats">
                        <div className="about-stat-item">
                            <div className="about-stat-number">500+</div>
                            <div className="about-stat-label">Venues Listed</div>
                        </div>
                        <div className="about-stat-item">
                            <div className="about-stat-number">10K+</div>
                            <div className="about-stat-label">Happy Customers</div>
                        </div>
                        <div className="about-stat-item">
                            <div className="about-stat-number">50+</div>
                            <div className="about-stat-label">Cities Covered</div>
                        </div>
                        <div className="about-stat-item">
                            <div className="about-stat-number">4.8★</div>
                            <div className="about-stat-label">Average Rating</div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="about-features">
                        <div className="about-feature-card">
                            <CheckCircle className="about-feature-icon" />
                            <h3 className="about-feature-title">Verified Venues</h3>
                            <p className="about-feature-description">All venues are personally inspected and verified for quality and safety.</p>
                        </div>
                        <div className="about-feature-card">
                            <Users className="about-feature-icon" />
                            <h3 className="about-feature-title">Expert Support</h3>
                            <p className="about-feature-description">Our team of event specialists is available 24/7 to help with your planning.</p>
                        </div>
                        <div className="about-feature-card">
                            <Award className="about-feature-icon" />
                            <h3 className="about-feature-title">Best Prices</h3>
                            <p className="about-feature-description">We negotiate the best rates directly with venue owners for our customers.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="about-team">
                <div className="about-team-content">
                    <h2 className="about-team-title">Meet Our Team</h2>
                    <div className="about-team-grid">
                        <div className="about-team-card">
                            <div className="about-team-avatar">JD</div>
                            <h3 className="about-team-name">John Doe</h3>
                            <p className="about-team-role">CEO & Founder</p>
                            <p className="about-team-bio">Former event planner with 10+ years experience in the industry.</p>
                        </div>
                        <div className="about-team-card">
                            <div className="about-team-avatar">JS</div>
                            <h3 className="about-team-name">Jane Smith</h3>
                            <p className="about-team-role">Head of Operations</p>
                            <p className="about-team-bio">Expert in venue management and customer relations.</p>
                        </div>
                        <div className="about-team-card">
                            <div className="about-team-avatar">MK</div>
                            <h3 className="about-team-name">Mike Johnson</h3>
                            <p className="about-team-role">Tech Lead</p>
                            <p className="about-team-bio">Full-stack developer passionate about creating amazing user experiences.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;