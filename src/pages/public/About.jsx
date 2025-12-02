import { CheckCircle, Users, MapPin, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-black mb-6">About VenueVibe</h1>
                    <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                        Kenya's premier event venue booking platform, connecting event planners with the perfect spaces for unforgettable moments.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            To simplify event planning by providing a seamless platform where venue owners and event organizers can connect,
                            ensuring every celebration, conference, and gathering finds its perfect home.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                        <div className="text-center">
                            <div className="text-4xl font-black text-indigo-600 mb-2">500+</div>
                            <div className="text-gray-600">Venues Listed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-indigo-600 mb-2">10K+</div>
                            <div className="text-gray-600">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-indigo-600 mb-2">50+</div>
                            <div className="text-gray-600">Cities Covered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-indigo-600 mb-2">4.8★</div>
                            <div className="text-gray-600">Average Rating</div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Verified Venues</h3>
                            <p className="text-gray-600">All venues are personally inspected and verified for quality and safety.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <Users className="text-blue-500 w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Expert Support</h3>
                            <p className="text-gray-600">Our team of event specialists is available 24/7 to help with your planning.</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <Award className="text-purple-500 w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Best Prices</h3>
                            <p className="text-gray-600">We negotiate the best rates directly with venue owners for our customers.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">
                                JD
                            </div>
                            <h3 className="text-xl font-bold mb-1">John Doe</h3>
                            <p className="text-indigo-600 mb-2">CEO & Founder</p>
                            <p className="text-gray-600 text-sm">Former event planner with 10+ years experience in the industry.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">
                                JS
                            </div>
                            <h3 className="text-xl font-bold mb-1">Jane Smith</h3>
                            <p className="text-indigo-600 mb-2">Head of Operations</p>
                            <p className="text-gray-600 text-sm">Expert in venue management and customer relations.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">
                                MK
                            </div>
                            <h3 className="text-xl font-bold mb-1">Mike Johnson</h3>
                            <p className="text-indigo-600 mb-2">Tech Lead</p>
                            <p className="text-gray-600 text-sm">Full-stack developer passionate about creating amazing user experiences.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;