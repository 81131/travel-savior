import { useRestaurants } from '../hooks/useRestaurants';

export default function RestaurantList({ onSelectRestaurant, selectedId }) {
    // TanStack Query handles loading and error states automatically
    const { data: restaurants, isLoading, error } = useRestaurants();

    if (isLoading) return <div className="p-4 text-blue-600 font-bold">Loading local restaurants...</div>;
    if (error) return <div className="p-4 text-red-500 font-bold">Failed to load restaurants. Is the backend running?</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants?.map((restaurant) => (
                <div 
                    key={restaurant.id} 
                    onClick={() => onSelectRestaurant(restaurant.id)}
                    className={`p-4 border rounded shadow-sm cursor-pointer transition-colors ${selectedId === restaurant.id ? 'border-blue-500 bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
                >
                    <h4 className="font-bold text-lg text-gray-800">{restaurant.name}</h4>
                    <p className="text-sm font-semibold text-gray-600 mb-2">{restaurant.cuisineType} • {restaurant.location}</p>
                    <p className="text-sm text-gray-500">Average Price: LKR {restaurant.averagePrice}</p>
                    <p className="text-sm text-gray-500">Hours: {restaurant.openingHours}</p>
                </div>
            ))}
        </div>
    );
}