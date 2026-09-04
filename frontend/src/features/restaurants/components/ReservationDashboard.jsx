import { useState } from 'react';
import { useReservations, useUpdateReservation, useDeleteReservation } from '../hooks/useRestaurants';

export default function ReservationDashboard() {
    const { data: reservations, isLoading, error } = useReservations();
    const deleteMutation = useDeleteReservation();
    const updateMutation = useUpdateReservation();
    
    const [editingId, setEditingId] = useState(null);
    const [editGuests, setEditGuests] = useState(1);

    if (isLoading) return <div className="p-8 text-center text-blue-500 font-bold animate-pulse">Loading your bookings...</div>;
    if (error) return <div className="p-8 text-center text-red-500 font-bold">Failed to load bookings.</div>;

    if (!reservations || reservations.length === 0) {
        return <div className="p-8 bg-white rounded-2xl shadow-sm text-center text-gray-500 font-medium border border-gray-100">No reservations found. Book a table above!</div>;
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to cancel this reservation?")) {
            deleteMutation.mutate(id);
        }
    };

    const startEdit = (reservation) => {
        setEditingId(reservation.id);
        setEditGuests(reservation.guestCount);
    };

    const saveEdit = (reservation) => {
        const payload = {
            id: reservation.id,
            data: {
                guestCount: editGuests,
                reservationTime: reservation.reservationTime // Keeping original time for simplicity in this edit
            }
        };
        updateMutation.mutate(payload, {
            onSuccess: () => setEditingId(null)
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mt-8">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">My Bookings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {reservations.map((res) => (
                    <div key={res.id} className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                            {new Date(res.reservationTime).toLocaleDateString()}
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-800 mb-1 mt-2">{res.restaurantName}</h4>
                        <p className="text-sm font-medium text-gray-600 mb-3">Name: <span className="text-gray-900">{res.customerName}</span></p>
                        
                        {editingId === res.id ? (
                            <div className="bg-white p-3 rounded border border-blue-200 mb-3">
                                <label className="block text-xs font-bold text-gray-700 mb-1">Update Guests</label>
                                <input 
                                    type="number" 
                                    min="1" max="20"
                                    value={editGuests} 
                                    onChange={(e) => setEditGuests(parseInt(e.target.value))}
                                    className="border p-1 w-full rounded mb-2"
                                />
                                <div className="flex gap-2">
                                    <button onClick={() => saveEdit(res)} className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-green-600 w-full">Save</button>
                                    <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-gray-500 w-full">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm font-medium text-gray-600 mb-4">Guests: <span className="text-gray-900">{res.guestCount}</span></p>
                        )}

                        {!editingId && (
                            <div className="flex gap-2 border-t border-slate-200 pt-3">
                                <button onClick={() => startEdit(res)} className="text-blue-600 hover:text-blue-800 text-sm font-bold flex-1 text-center bg-blue-50 py-1.5 rounded transition-colors">Edit Guests</button>
                                <button onClick={() => handleDelete(res.id)} className="text-red-600 hover:text-red-800 text-sm font-bold flex-1 text-center bg-red-50 py-1.5 rounded transition-colors">Cancel</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}