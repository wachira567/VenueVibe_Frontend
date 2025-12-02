import { useState } from 'react';
import { Trash2, CheckCircle, XCircle, Plus, Edit } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-indigo-900">ADMIN GOD MODE</h1>
                    <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus size={18} /> Add New Venue
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b pb-2">
                    {['bookings', 'venues', 'users', 'reviews'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full font-bold capitalize ${activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-xl shadow p-6">
                    {activeTab === 'bookings' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b"><th className="pb-3">Venue</th><th className="pb-3">Client</th><th className="pb-3">Date</th><th className="pb-3">Status</th><th className="pb-3">Actions</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-4">Karen Villa</td>
                                        <td>Jane Doe</td>
                                        <td>2025-12-12</td>
                                        <td><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pending</span></td>
                                        <td className="flex gap-2">
                                            <button className="text-green-600 hover:bg-green-50 p-1 rounded" title="Approve"><CheckCircle/></button>
                                            <button className="text-red-600 hover:bg-red-50 p-1 rounded" title="Reject"><XCircle/></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Placeholder for other tabs */}
                    {activeTab === 'users' && <div className="text-gray-500">User Management Interface (Delete/Ban Users)</div>}
                    {activeTab === 'venues' && <div className="text-gray-500">Venue Editing Interface (Upload Images/Edit Prices)</div>}
                    {activeTab === 'reviews' && <div className="text-gray-500">Review Moderation (Delete Inappropriate Reviews)</div>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;