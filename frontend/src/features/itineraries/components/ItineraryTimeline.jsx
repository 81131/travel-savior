import { useItineraryItems } from '../hooks/useItineraries';

export default function ItineraryTimeline({ itineraryId }) {
    const { data: items, isLoading, error } = useItineraryItems(itineraryId);

    if (isLoading) return <div className="animate-pulse bg-white p-6 rounded-2xl h-64">Loading your journey...</div>;
    if (error) return <div className="text-red-500 font-bold p-4 bg-red-50 rounded-xl">Error loading timeline.</div>;

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
                <div className="text-6xl mb-4">🌴</div>
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Your itinerary is empty</h3>
                <p className="text-gray-500 mt-2 font-medium">Add some Sri Lankan destinations to start building your perfect day.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-8 relative z-10">Your Travel Timeline</h3>
            
            <div className="relative border-l-4 border-teal-100 ml-4 space-y-8 pb-4">
                {items.map((item, index) => (
                    <div key={item.id} className="relative pl-8 transition-all hover:translate-x-1 duration-300">
                        {/* Timeline Dot */}
                        <div className="absolute -left-3.5 top-1.5 w-6 h-6 bg-white border-4 border-teal-500 rounded-full shadow-sm"></div>
                        
                        <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                                {new Date(item.visitDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{item.destinationName}</h4>
                            <div className="flex items-center text-gray-600 font-medium text-sm gap-2">
                                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{item.startTime} — {item.endTime}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}