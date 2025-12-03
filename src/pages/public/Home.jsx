import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, ArrowRight, Heart, Shield, Clock, Award, Home as HomeIcon, Building, TreePine, Waves, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';

// --- Data & Configuration ---
const categories = [
    // DESIGN NOTE: Using real imagery instead of flat colors for a premium feel.
    { name: 'Wedding Venues', icon: Heart, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop' },
    { name: 'Corporate Events', icon: Building, image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=400&auto=format&fit=crop' },
    { name: 'Garden Parties', icon: TreePine, image: 'https://images.unsplash.com/photo-1558005530-a6a60305c992?q=80&w=400&auto=format&fit=crop' },
    { name: 'Beach Resorts', icon: Waves, image: 'https://images.unsplash.com/photo-1520483602335-3b36d400c576?q=80&w=400&auto=format&fit=crop' },
    { name: 'Conference Halls', icon: Users, image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=400&auto=format&fit=crop' },
];


// --- Animation Variants (Framer Motion) ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
};

const Home = () => {
    const [searchLocation, setSearchLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [guestCount, setGuestCount] = useState('');
    const [featuredVenues, setFeaturedVenues] = useState([]);
    const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();

    // Fetch venues from API or use fallback
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
                const response = await fetch(`${apiUrl}/venues`);
                if (response.ok) {
                    const data = await response.json();
                    // Get random 3 venues or all if less than 3
                    const shuffled = data.sort(() => 0.5 - Math.random());
                    const selected = shuffled.slice(0, 3);
                    setFeaturedVenues(selected.map(venue => ({
                        id: venue.id,
                        name: venue.name,
                        location: venue.location,
                        price: venue.price_per_day,
                        rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
                        reviews: Math.floor(Math.random() * 200) + 50,
                        image: venue.image_url,
                        category: venue.category,
                        tags: ['Premium', 'Verified', 'Popular']
                    })));
                } else {
                    // Use fallback data
                    setFeaturedVenues([
                        {
                            id: 1,
                            name: "Karen Villa Gardens",
                            location: "Karen, Nairobi",
                            price: 45000,
                            rating: 4.8,
                            reviews: 124,
                            image: "https://images.unsplash.com/photo-1587316830614-693c312483e9?q=80&w=1350&auto=format&fit=crop",
                            category: "Garden Parties",
                            tags: ['Lush', 'Private', 'Gazebo']
                        },
                        {
                            id: 2,
                            name: "The Aviary Rooftop",
                            location: "Westlands, Nairobi",
                            price: 85000,
                            rating: 4.9,
                            reviews: 89,
                            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1350&auto=format&fit=crop",
                            category: "Corporate Events",
                            tags: ['City View', 'Modern', 'Bar']
                        },
                        {
                            id: 3,
                            name: "Watamu Blue Bay",
                            location: "Watamu, Coast",
                            price: 120000,
                            rating: 4.95,
                            reviews: 210,
                            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                            category: "Beach Resorts",
                            tags: ['Beachfront', 'Luxury', 'Pool']
                        }
                    ]);
                }
            } catch (error) {
                console.log('Using fallback venue data');
                // Use fallback data
                setFeaturedVenues([
                    {
                        id: 1,
                        name: "Karen Villa Gardens",
                        location: "Karen, Nairobi",
                        price: 45000,
                        rating: 4.8,
                        reviews: 124,
                        image: "https://images.unsplash.com/photo-1587316830614-693c312483e9?q=80&w=1350&auto=format&fit=crop",
                        category: "Garden Parties",
                        tags: ['Lush', 'Private', 'Gazebo']
                    },
                    {
                        id: 2,
                        name: "The Aviary Rooftop",
                        location: "Westlands, Nairobi",
                        price: 85000,
                        rating: 4.9,
                        reviews: 89,
                        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1350&auto=format&fit=crop",
                        category: "Corporate Events",
                        tags: ['City View', 'Modern', 'Bar']
                    },
                    {
                        id: 3,
                        name: "Watamu Blue Bay",
                        location: "Watamu, Coast",
                        price: 120000,
                        rating: 4.95,
                        reviews: 210,
                        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                        category: "Beach Resorts",
                        tags: ['Beachfront', 'Luxury', 'Pool']
                    }
                ]);
            }
        };

        fetchVenues();
    }, []);

    // Scroll animation handler
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchLocation.trim()) params.append('location', searchLocation.trim());
        if (eventDate) params.append('date', eventDate);
        if (guestCount) params.append('guests', guestCount);

        navigate(`/venues?${params.toString()}`);
    };


    return (
        <div className="min-h-screen bg-neutral-50 font-sans selection:bg-primary-500/20 selection:text-primary-900">

            {/* 
                HERO SECTION: Cinematic & Deep Glass
             */}
            <section className="hero-section">
                {/* Background Image with Slow Pan */}
                <div className="hero-background">
                    <img
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
                        alt="Venue Atmosphere"
                        className="hero-background"
                    />
                </div>

                {/* Gradient Scrim Overlay */}
                <div className="hero-gradient-scrim"></div>
                <div className="hero-light-leak"></div>
                <div className="hero-noise"></div>

                {/* Content Layer */}
                <div className="hero-content">
                    {/* Badge */}
                    <motion.div
                        variants={fadeInUp} initial="hidden" animate="visible"
                        className="hero-badge"
                    >
                        Discover Kenya's Finest
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
                        className="hero-headline"
                    >
                        Find the space that <br />
                        <span className="gradient-text">
                            matches your vibe.
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}
                        className="hero-subtitle"
                    >
                        Unforgettable venues for life's biggest moments. Curated for quality, ambiance, and experience.
                    </motion.p>

                    {/* Functional Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="minimal-search"
                    >
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                placeholder="Search venues by location..."
                                className="minimal-search-input"
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                            />
                            <button type="submit" className="search-submit-btn">
                                <Search size={20} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* 
                CATEGORIES: Immersive Visual Pills
            */}
            <section className="categories-section fade-in-up">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-dark-900 mb-3 tracking-tight">Explore by Vibe</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Browse curated categories for your specific occasion.</p>
                    </motion.div>

                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                                className="category-card"
                                onClick={() => navigate(`/venues?category=${category.name.toLowerCase().replace(' ', '-')}`)}
                            >
                                <img src={category.image} alt={category.name} className="category-image" />
                                <div className="category-overlay"></div>
                                <div className="category-content">
                                    <category.icon className="category-icon" />
                                    <span className="category-title">
                                        {category.name.split(' ')[0]}<br/>{category.name.split(' ')[1] || ''}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 
                FEATURED VENUES: Borderless Immersive Cards
            */}
            <section className="venues-section slide-in-left">
                <div className="venues-blob-1"></div>
                <div className="venues-blob-2"></div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                             <h2 className="text-3xl md:text-4xl font-black text-dark-900 mb-3 tracking-tight">Trending Spaces</h2>
                             <p className="text-lg text-gray-600">Highly rated venues loved by the VenueVibe community.</p>
                        </div>
                        <button onClick={() => navigate('/venues')} className="view-all-venues-btn">
                            View All Venues <ArrowRight size={18} />
                        </button>
                    </div>

                    <motion.div
                        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="venues-grid"
                    >
                        {(featuredVenues || []).map((venue, index) => (
                            <motion.div
                                key={venue.id}
                                variants={fadeInUp}
                                className="venue-card"
                                onClick={() => navigate(`/venues/${venue.id}`)}
                            >
                                <img src={venue.image} alt={venue.name} className="venue-image" />
                                <div className="venue-gradient"></div>

                                <div className="venue-tags">
                                    {venue.tags?.map(tag => (
                                         <span key={tag} className="venue-tag">{tag}</span>
                                    ))}
                                </div>

                                <div className="venue-rating">
                                    <Star className="text-yellow-500 fill-current" size={16} />
                                    <span>{venue.rating}</span>
                                    <span className="text-gray-500 text-xs font-medium">({venue.reviews})</span>
                                </div>

                                <div className="venue-content">
                                    <h3 className="venue-name">{venue.name}</h3>
                                    <div className="venue-location">
                                        <MapPin size={18} />
                                        {venue.location}
                                    </div>
                                    <div className="venue-footer">
                                        <div>
                                            <span className="venue-price">
                                                KES {venue.price.toLocaleString()}
                                            </span>
                                            <span className="venue-price-sub">/ day</span>
                                        </div>
                                        <div className="venue-arrow">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 
                WHY US: Asymmetrical Bento Grid
            */}
            <section className="why-us-section fade-in-up">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
                         <h2 className="text-3xl md:text-4xl font-black text-dark-900 mb-3 tracking-tight">The VenueVibe Standard</h2>
                         <p className="text-lg text-gray-600 max-w-2xl mx-auto">We are redefining the event booking experience with trust and quality.</p>
                    </motion.div>

                    <div className="why-us-grid">
                        {/* Large Featured Box */}
                        <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{delay:0.1}} viewport={{ once: true }} className="why-us-large">
                            <div className="why-us-large-content">
                                <div className="why-us-icon">
                                    <Shield size={28} />
                                </div>
                                <h3 className="why-us-title">Verified Quality Hosts</h3>
                                <p className="why-us-description">We physically vet every venue. No catfish, no surprises. Just stunning spaces that match the photos.</p>
                                <ul className="why-us-checklist">
                                    <li className="why-us-check">
                                        <CheckCircle className="why-us-check-icon" size={20}/>
                                        In-person verification
                                    </li>
                                    <li className="why-us-check">
                                        <CheckCircle className="why-us-check-icon" size={20}/>
                                        Host identity check
                                    </li>
                                    <li className="why-us-check">
                                        <CheckCircle className="why-us-check-icon" size={20}/>
                                        Accurate amenity listing
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Standard Box 1 */}
                        <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{delay:0.2}} viewport={{ once: true }} className="why-us-card">
                            <Clock className="why-us-small-icon" size={36} />
                            <h3 className="why-us-small-title">24/7 Concierge</h3>
                            <p className="why-us-small-description">Round-the-clock support for any booking hiccups or questions.</p>
                        </motion.div>

                        {/* Standard Box 2 */}
                        <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{delay:0.3}} viewport={{ once: true }} className="why-us-card">
                            <Award className="why-us-small-icon" size={36} />
                            <h3 className="why-us-small-title">Best Price Guarantee</h3>
                            <p className="why-us-small-description">Direct host partnerships ensure you never overpay.</p>
                        </motion.div>

                        {/* Social Proof Box */}
                        <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{delay:0.4}} viewport={{ once: true }} className="why-us-social">
                            <div className="why-us-social-content">
                                <h3 className="why-us-social-title">Trusted by 10,000+ Planners</h3>
                                <p className="why-us-social-description">Join the community creating unforgettable memories.</p>
                            </div>
                            <div className="why-us-avatars">
                                <img className="why-us-avatar" src="https://i.pravatar.cc/150?img=32" alt=""/>
                                <img className="why-us-avatar" src="https://i.pravatar.cc/150?img=41" alt=""/>
                                <img className="why-us-avatar" src="https://i.pravatar.cc/150?img=55" alt=""/>
                                <div className="why-us-avatar-extra">+5k</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 
                HOW IT WORKS: Connected Journey
            */}
            <section className="how-it-works-section slide-in-right">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-black text-dark-900 mb-3 tracking-tight">The Journey to Your Event</h2>
                        <p className="text-lg text-gray-600">Simple, secure, and seamless from start to finish.</p>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="how-it-works-connector"></div>

                        {/* Step 1 */}
                        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="step-card">
                            <div className="step-icon">
                                <Search className="text-secondary-600" size={36} />
                                <div className="step-number">1</div>
                            </div>
                            <h3 className="step-title">Search & Discover</h3>
                            <p className="step-description">Use our smart filters to find venues that match your vibe, budget, and guest count.</p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="step-card">
                            <div className="step-icon">
                                <Calendar className="text-secondary-600" size={36} />
                                <div className="step-number">2</div>
                            </div>
                            <h3 className="step-title">Request & Secure</h3>
                            <p className="step-description">Send a booking request. Once accepted by the host, pay securely to lock it in.</p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }} className="step-card">
                            <div className="step-icon">
                                <Waves className="text-secondary-600" size={36} />
                                <div className="step-number">3</div>
                            </div>
                            <h3 className="step-title">Vibe & Celebrate</h3>
                            <p className="step-description">Show up and enjoy. We handle the details so you can focus on making memories.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 
                FINAL CTA: Organic & Textured
             */}
            <section className="cta-section fade-in-up">
                <div className="cta-noise"></div>
                <div className="cta-light-1"></div>
                <div className="cta-light-2"></div>

                <div className="cta-content">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className="cta-title">Ready to host the <br/>event of the year?</h2>
                        <p className="cta-subtitle">
                            Don't settle for boring. Discover spaces that inspire connection and celebration.
                        </p>
                        <div className="cta-buttons">
                            <button onClick={() => navigate('/venues')} className="cta-primary">
                                Browse All Venues
                            </button>
                            <button onClick={() => navigate('/register')} className="cta-secondary">
                                Become a Host <ArrowRight className="group-hover:translate-x-1 transition-transform"/>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;