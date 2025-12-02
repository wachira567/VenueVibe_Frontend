import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, MapPin, Users } from 'lucide-react';
import api from '../../api/axios';

const VenueList = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const locationFilter = searchParams.get('location');

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                setLoading(true);

                // Construct the URL with query parameters
                // If locationFilter exists, it becomes: /venues?location=Karen
                // If not, it stays: /venues
                let url = '/venues';
                if (locationFilter) {
                    url += `?location=${locationFilter}`;
                }

                const res = await api.get(url);
                setVenues(res.data);
            } catch (err) {
                console.error("Failed to fetch venues", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVenues();
    }, [locationFilter]); // This ensures it runs again if the user searches for a new place

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {locationFilter ? `Venues in "${locationFilter}"` : "All Venues"}
                    </h1>

                    <div className="flex gap-4 mt-4 md:mt-0">
                        <select className="border p-2 rounded-lg bg-white shadow-sm">
                            <option>Sort by: Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                        <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50">
                            <Filter size={18}/> Filters
                        </button>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center py-20">Loading venues...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {venues.map((venue) => (
                            <Link to={`/venues/${venue.id}`} key={venue.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={venue.image_url || "https://via.placeholder.com/600x400"}
                                        alt={venue.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                                        {venue.category}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">{venue.name}</h3>
                                        <span className="font-bold text-indigo-600">KES {venue.price_per_day.toLocaleString()}</span>
                                    </div>

                                    <p className="flex items-center text-gray-500 text-sm mb-4">
                                        <MapPin size={16} className="mr-1"/> {venue.location}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-gray-600 border-t pt-4">
                                        <span className="flex items-center gap-1"><Users size={16}/> {venue.capacity} Guests</span>
                                        <span className="flex items-center gap-1 text-green-600 font-medium">Available Now</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VenueList;