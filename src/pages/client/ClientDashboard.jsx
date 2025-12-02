import { useEffect, useState, useContext } from 'react';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const ClientDashboard = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('bookings');

    useEffect(() => {
        // Fetch USER specific bookings
        //  update backend to filter by current user
        const fetchBookings = async () => {
            const res = await api.get('/bookings'); // In real app: /bookings/my-bookings
            setBookings(res.data);
        };
        fetchBookings();
    }, []);

    const getStatusBadge = (status) => {
        if (status === 'Approved') return <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold"><CheckCircle size={14}/> Approved</span>;
        if (status === 'Rejected') return <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold"><XCircle size={14}/> Rejected</span>;
        return <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold"><Clock size={14}/> Pending</span>;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center mb-6">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">
                            {user?.username.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="font-bold text-xl">{user?.username}</h2>
                        <p className="text-gray-500 text-sm">Client</p>
                    </div>

                    <nav className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <button onClick={() => setActiveTab('bookings')} className={`w-full text-left p-4 font-medium hover:bg-gray-50 border-b ${activeTab === 'bookings' ? 'bg-indigo-50 text-indigo-600' : ''}`}>
                            My Bookings
                        </button>
                        <button onClick={() => setActiveTab('saved')} className={`w-full text-left p-4 font-medium hover:bg-gray-50 border-b ${activeTab === 'saved' ? 'bg-indigo-50 text-indigo-600' : ''}`}>
                            Saved Venues
                        </button>
                        <button onClick={() => setActiveTab('settings')} className={`w-full text-left p-4 font-medium hover:bg-gray-50 ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : ''}`}>
                            Account Settings
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-6">
                        {activeTab === 'bookings' && "My Event Bookings"}
                        {activeTab === 'saved' && "Saved Properties"}
                        {activeTab === 'settings' && "Account Settings"}
                    </h1>

                    {activeTab === 'bookings' && (
                        <div className="space-y-4">
                            {bookings.length === 0 ? (
                                <div className="bg-white p-10 rounded-xl text-center text-gray-500 shadow">
                                    You haven't made any bookings yet.
                                </div>
                            ) : (
                                bookings.map((booking) => (
                                    <div key={booking.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-600 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">Booking #{booking.id}</h3>
                                            <div className="flex items-center gap-4 text-gray-500 mt-2">
                                                <span className="flex items-center gap-1"><Calendar size={16}/> {new Date(booking.event_date).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span>{booking.guest_count} Guests</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="mb-2">{getStatusBadge(booking.status)}</div>
                                            <p className="font-bold text-gray-900">KES {booking.total_cost.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;