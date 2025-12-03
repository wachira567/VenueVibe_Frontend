import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, MapPin, Users, Search } from 'lucide-react';
import api from '../../api/axios';
import './VenueList.css';

const VenueList = () => {
    const [venues, setVenues] = useState([]);
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const locationFilter = searchParams.get('location');

    // Filter states
    const [sortBy, setSortBy] = useState('recommended');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [capacityFilter, setCapacityFilter] = useState('all');

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
                setFilteredVenues(res.data); // Initialize filtered venues
            } catch (err) {
                console.error("Failed to fetch venues", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVenues();
    }, [locationFilter]); // This ensures it runs again if the user searches for a new place

    // Apply filters whenever filter states change
    useEffect(() => {
        let filtered = [...venues];

        // Apply category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(venue => venue.category.toLowerCase() === categoryFilter.toLowerCase());
        }

        // Apply price range filter
        if (priceRange !== 'all') {
            switch (priceRange) {
                case 'under-50000':
                    filtered = filtered.filter(venue => venue.price_per_day < 50000);
                    break;
                case '50000-100000':
                    filtered = filtered.filter(venue => venue.price_per_day >= 50000 && venue.price_per_day <= 100000);
                    break;
                case 'over-100000':
                    filtered = filtered.filter(venue => venue.price_per_day > 100000);
                    break;
                default:
                    break;
            }
        }

        // Apply capacity filter
        if (capacityFilter !== 'all') {
            switch (capacityFilter) {
                case 'small':
                    filtered = filtered.filter(venue => venue.capacity <= 100);
                    break;
                case 'medium':
                    filtered = filtered.filter(venue => venue.capacity > 100 && venue.capacity <= 300);
                    break;
                case 'large':
                    filtered = filtered.filter(venue => venue.capacity > 300);
                    break;
                default:
                    break;
            }
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price_per_day - b.price_per_day);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price_per_day - a.price_per_day);
                break;
            case 'capacity':
                filtered.sort((a, b) => b.capacity - a.capacity);
                break;
            case 'recommended':
            default:
                // Keep original order for recommended
                break;
        }

        setFilteredVenues(filtered);
    }, [venues, categoryFilter, priceRange, capacityFilter, sortBy]);

    return (
        <div className="venue-list-page">
            <div className="venue-list-container">
                {/* Header & Filters */}
                <div className="venue-list-header">
                    <div>
                        <h1 className="venue-list-title">
                            {locationFilter ? `Venues in "${locationFilter}"` : "All Venues"}
                        </h1>
                        <p className="venue-list-subtitle">
                            Discover the perfect venue for your special occasion from our curated collection
                        </p>
                    </div>

                    <div className="venue-list-controls">
                        <div className="venue-list-filters">
                            <select
                                className="venue-list-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="recommended">Sort by: Recommended</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="capacity">Capacity: High to Low</option>
                            </select>

                            <select
                                className="venue-list-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                <option value="wedding">Wedding</option>
                                <option value="corporate">Corporate</option>
                                <option value="beach">Beach</option>
                                <option value="garden">Garden</option>
                                <option value="hall">Hall</option>
                            </select>

                            <select
                                className="venue-list-select"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                            >
                                <option value="all">All Prices</option>
                                <option value="under-50000">Under KES 50,000</option>
                                <option value="50000-100000">KES 50,000 - 100,000</option>
                                <option value="over-100000">Over KES 100,000</option>
                            </select>

                            <select
                                className="venue-list-select"
                                value={capacityFilter}
                                onChange={(e) => setCapacityFilter(e.target.value)}
                            >
                                <option value="all">All Capacities</option>
                                <option value="small">Small (≤100)</option>
                                <option value="medium">Medium (101-300)</option>
                                <option value="large">Large (300+)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Venue Grid */}
                {loading ? (
                    <div className="venue-list-loading">
                        <div className="venue-list-loading-spinner"></div>
                        <p className="venue-list-loading-text">Discovering amazing venues...</p>
                    </div>
                ) : filteredVenues.length === 0 ? (
                    <div className="venue-list-empty">
                        <Search className="venue-list-empty-icon" />
                        <h3 className="venue-list-empty-title">No venues found</h3>
                        <p className="venue-list-empty-text">
                            {locationFilter
                                ? `We couldn't find any venues in "${locationFilter}". Try searching for a different location.`
                                : "No venues are currently available. Check back soon!"
                            }
                        </p>
                        <Link to="/" className="venue-list-empty-action">
                            <Search size={18} />
                            Browse All Venues
                        </Link>
                    </div>
                ) : (
                    <div className="venue-list-grid">
                        {filteredVenues.map((venue) => (
                            <Link to={`/venues/${venue.id}`} key={venue.id} className="venue-card">
                                <div className="venue-image-container">
                                    <img
                                        src={venue.image_url || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"}
                                        alt={venue.name}
                                        className="venue-image"
                                    />
                                    <div className="venue-category-badge">
                                        {venue.category}
                                    </div>
                                </div>

                                <div className="venue-content">
                                    <div className="venue-header">
                                        <h3 className="venue-name">{venue.name}</h3>
                                        <span className="venue-price">KES {venue.price_per_day.toLocaleString()}</span>
                                    </div>

                                    <p className="venue-location">
                                        <MapPin className="venue-location-icon" />
                                        {venue.location}
                                    </p>

                                    <div className="venue-footer">
                                        <span className="venue-capacity">
                                            <Users className="venue-capacity-icon" />
                                            {venue.capacity} Guests
                                        </span>
                                        <span className="venue-availability">Available Now</span>
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