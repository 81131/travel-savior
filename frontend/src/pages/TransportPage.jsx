import { useState } from 'react';
import { useSearchRoutes } from '../features/transport/hooks/useTransport';
import SaveTransportForm from '../features/transport/components/SaveTransportForm';

export default function TransportPage() {
    const [searchParams, setSearchParams] = useState({ origin: '', destination: '' });
    const [selectedRouteId, setSelectedRouteId] = useState(null);

    // Pass the search state to the custom hook
    const { data: routes, isLoading, error } = useSearchRoutes(searchParams.origin, searchParams.destination);

    // Calculate 'Cheapest' and 'Fastest' for dynamic badging
    const minCost = routes?.length > 0 ? Math.min(...routes.map(r => r.estimatedCostLKR)) : null;
    const minTime = routes?.length > 0 ? Math.min(...routes.map(r => r.estimatedDurationMinutes)) : null;

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            {/* Modern Header Section */}
            <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-3xl p-10 mb-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight z-10 relative">Smart Transport Matrix</h1>
                <p className="text-indigo-200 text-lg md:text-xl font-medium max-w-2xl z-10 relative">Compare Train, Bus, and Taxi options across Sri Lanka. Find the fastest routes and avoid overpaying.</p>
                
                {/* Search Bar */}
                <div className="mt-8 flex flex-col md:flex-row gap-4 relative z-10">
                    <input 
                        type="text" 
                        placeholder="Origin (e.g. Colombo)" 
                        className="p-4 rounded-xl text-gray-900 font-semibold w-full md:w-1/3 focus:ring-4 focus:ring-indigo-500/50 outline-none"
                        value={searchParams.origin}
                        onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder="Destination (e.g. Ella)" 
                        className="p-4 rounded-xl text-gray-900 font-semibold w-full md:w-1/3 focus:ring-4 focus:ring-indigo-500/50 outline-none"
                        value={searchParams.destination}
                        onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Results Matrix */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                        Available Routes {routes && <span className="bg-indigo-100 text-indigo-800 text-sm py-1 px-3 rounded-full">{routes.length} found</span>}
                    </h2>
                    
                    {isLoading && <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-24 bg-gray-200 rounded-2xl"></div></div></div>}
                    {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl font-bold">Error loading routes.</div>}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {routes?.map((route) => {
                            const isCheapest = route.estimatedCostLKR === minCost && minCost !== null;
                            const isFastest = route.estimatedDurationMinutes === minTime && minTime !== null;
                            const isSelected = selectedRouteId === route.id;

                            return (
                                <div 
                                    key={route.id} 
                                    onClick={() => setSelectedRouteId(route.id)}
                                    className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-indigo-500 bg-indigo-50 shadow-lg transform -translate-y-1' : 'border-transparent bg-white shadow hover:shadow-xl hover:-translate-y-1'}`}
                                >
                                    {/* Badges */}
                                    <div className="absolute -top-3 -right-2 flex flex-col gap-1">
                                        {isCheapest && <span className="bg-green-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md shadow-green-500/30">💰 Cheapest</span>}
                                        {isFastest && <span className="bg-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md shadow-orange-500/30">⚡ Fastest</span>}
                                    </div>

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1 block">{route.transportMode}</span>
                                            <h4 className="font-extrabold text-xl text-gray-900">{route.origin} → {route.destination}</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <p className="flex justify-between text-sm font-bold text-gray-700">
                                            <span>Est. Cost:</span> <span className="text-green-600">LKR {route.estimatedCostLKR.toLocaleString()}</span>
                                        </p>
                                        <p className="flex justify-between text-sm font-semibold text-gray-600">
                                            <span>Duration:</span> <span>{Math.floor(route.estimatedDurationMinutes / 60)}h {route.estimatedDurationMinutes % 60}m</span>
                                        </p>
                                        <p className="flex justify-between text-sm font-semibold text-gray-600">
                                            <span>Distance:</span> <span>{route.distanceKm} km</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        {routes?.length === 0 && !isLoading && (
                            <div className="col-span-full p-8 text-center text-gray-500 font-medium bg-white rounded-2xl shadow border border-gray-100">
                                No routes found for this search. Try "Colombo" and "Ella".
                            </div>
                        )}
                    </div>
                </div>

                {/* Save Form Side Panel */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <SaveTransportForm selectedRouteId={selectedRouteId} />
                    </div>
                </div>
            </div>
        </div>
    );
}