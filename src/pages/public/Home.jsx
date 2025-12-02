import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';

const Home = () => {
    const [searchLocation, setSearchLocation] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchLocation.trim()) {
            navigate(`/venues?location=${encodeURIComponent(searchLocation.trim())}`);
        } else {
            navigate('/venues');
        }
    };

    const featuredVenues = [
        {
            id: 1,
            name: "Karen Villa Gardens",
            location: "Karen, Nairobi",
            price: 45000,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 2,
            name: "Westlands Grand Hall",
            location: "Westlands, Nairobi",
            price: 65000,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 3,
            name: "Mombasa Beach Resort",
            location: "Mombasa",
            price: 55000,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
                            Find Your <span className="text-indigo-600">Perfect</span> Venue
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                            Discover and book the best event spaces in Kenya. From intimate gatherings to grand celebrations,
                            find venues that match your vision and budget.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
                            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                                <div className="flex-1 relative">
                                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Where is your event? (e.g., Nairobi, Karen, Mombasa)"
                                        className="w-full pl-10 pr-4 py-3 border-0 focus:ring-0 text-gray-900 placeholder-gray-500"
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                                >
                                    <Search size={20} />
                                    Search Venues
                                </button>
                            </div>
                        </form>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap justify-center gap-8 text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>500+ Verified Venues</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>10,000+ Happy Customers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>All Major Cities</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-20"></div>
                </div>
            </div>

            {/* Featured Venues */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Venues</h2>
                        <p className="text-xl text-gray-600">Handpicked venues loved by our community</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredVenues.map((venue) => (
                            <div key={venue.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={venue.image}
                                        alt={venue.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                                        <Star className="text-yellow-500 fill-current" size={14} />
                                        <span className="text-sm font-bold">{venue.rating}</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{venue.name}</h3>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <MapPin size={16} className="mr-1" />
                                        {venue.location}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-indigo-600">
                                            KES {venue.price.toLocaleString()}
                                        </span>
                                        <button
                                            onClick={() => navigate(`/venues/${venue.id}`)}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-1"
                                        >
                                            View <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate('/venues')}
                            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition"
                        >
                            View All Venues
                        </button>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How VenueVibe Works</h2>
                        <p className="text-xl text-gray-600">Simple steps to find and book your perfect venue</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-indigo-600" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">1. Search & Discover</h3>
                            <p className="text-gray-600">Browse our curated collection of verified venues across Kenya</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="text-indigo-600" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">2. Book & Confirm</h3>
                            <p className="text-gray-600">Submit your booking request with all event details</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="text-indigo-600" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">3. Celebrate</h3>
                            <p className="text-gray-600">Enjoy your event in a stunning, professionally managed venue</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-indigo-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Venue?</h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Join thousands of event planners who trust VenueVibe for their special occasions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/venues')}
                            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
                        >
                            Browse Venues
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition"
                        >
                            Sign Up Free
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;