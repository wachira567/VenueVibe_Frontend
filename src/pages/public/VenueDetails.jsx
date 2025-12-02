import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { MapPin, Users, Calendar, DollarSign, Star } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const VenueDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);

    // Mock data fetching 
    useEffect(() => {
        // api.get(`/venues/${id}`).then(res => setVenue(res.data));
        
        setVenue({
            id: 1, name: "The Emerald Garden", location: "Karen, Nairobi",
            price: 50000, capacity: 300, description: "A lush garden...",
            images: ["https://source.unsplash.com/random/800x600?garden"]
        });
    }, [id]);

    const handleAction = (actionType) => {
        if (!user) {
            toast.info(`Please sign in to ${actionType} this venue.`);
            // Redirect to login, but remember where they were!
            navigate("/login", { state: { from: `/venues/${id}` } });
            return;
        }

        if (actionType === 'book') {
            // Open Booking Modal
            toast.success("Opening Booking Form...");
        } else if (actionType === 'inquire') {
            // Open Chat/Message Modal
            toast.success("Contacting Admin...");
        }
    };

    if (!venue) return <div className="p-10 text-center">Loading Venue...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Image Gallery */}
            <div className="h-[500px] rounded-2xl overflow-hidden mb-8 shadow-xl">
                <img src={venue.images[0]} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Venue" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Info Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-4xl font-extrabold text-gray-900">{venue.name}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                        <span className="flex items-center gap-1"><MapPin className="text-indigo-600"/> {venue.location}</span>
                        <span className="flex items-center gap-1"><Users className="text-indigo-600"/> {venue.capacity} Guests</span>
                        <span className="flex items-center gap-1"><Star className="text-yellow-500"/> 4.8 (24 Reviews)</span>
                    </div>

                    <div className="prose max-w-none">
                        <h3 className="text-xl font-bold">About this space</h3>
                        <p className="text-gray-600 mt-2">{venue.description}</p>
                    </div>

                    {/* Public Reviews Section (Req: Public but verified only) */}
                    <div className="bg-gray-50 p-6 rounded-xl mt-8">
                        <h3 className="text-xl font-bold mb-4">Reviews</h3>
                        {/* Map reviews here */}
                        <div className="border-b pb-4 mb-4">
                            <p className="font-bold">John Doe <span className="text-xs text-green-600 bg-green-100 px-2 rounded">Verified Booking</span></p>
                            <p className="text-gray-600">Great place for a wedding!</p>
                        </div>
                    </div>
                </div>

                {/* Booking Card */}
                <div className="relative">
                    <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
                        <div className="flex justify-between items-end mb-6">
                            <p className="text-gray-500">Price per day</p>
                            <p className="text-3xl font-bold text-indigo-600">KES {venue.price.toLocaleString()}</p>
                        </div>

                        <button
                            onClick={() => handleAction('book')}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl mb-4 transition"
                        >
                            Request to Book
                        </button>

                        <button
                            onClick={() => handleAction('inquire')}
                            className="w-full border-2 border-indigo-600 text-indigo-600 font-bold py-4 rounded-xl hover:bg-indigo-50 transition"
                        >
                            Inquire via Chat
                        </button>

                        <p className="text-xs text-center text-gray-400 mt-4">
                            You won't be charged yet. Invoices are sent after admin approval.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueDetails;