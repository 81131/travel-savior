import { useState } from 'react';
import RestaurantList from '../features/restaurants/components/RestaurantList';
import ReservationForm from '../features/restaurants/components/ReservationForm';
import ReservationDashboard from '../features/restaurants/components/ReservationDashboard'; // IMPORT NEW COMPONENT

export default function RestaurantsPage() {
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-4xl font-bold mb-2 text-gray-800">Local Food Discovery</h1>
            <p className="text-gray-600 text-lg mb-8 font-medium">Find authentic Sri Lankan restaurants and reserve your table instantly.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Restaurants</h2>
                    <RestaurantList onSelectRestaurant={setSelectedRestaurantId} selectedId={selectedRestaurantId} />
                </div>
                <div className="lg:col-span-1">
                    <ReservationForm selectedRestaurantId={selectedRestaurantId} />
                </div>
            </div>

            {/* FULL CRUD DASHBOARD RENDERED HERE */}
            <ReservationDashboard />
        </div>
    );
}