import ItineraryTimeline from '../features/itineraries/components/ItineraryTimeline';
import AddDestinationForm from '../features/itineraries/components/AddDestinationForm';

export default function ItineraryPage() {
    // Hardcoded to Itinerary ID 1 for the MVP
    const itineraryId = 1; 

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-teal-800 to-emerald-900 rounded-[2rem] p-10 md:p-14 mb-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight relative z-10">Smart Itinerary Planner</h1>
                <p className="text-teal-100 text-lg md:text-xl font-medium max-w-2xl relative z-10 leading-relaxed">
                    Build your perfect Sri Lankan journey. Our intelligent engine automatically calculates travel times and blocks scheduling conflicts.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Form Section */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24">
                        <AddDestinationForm itineraryId={itineraryId} />
                    </div>
                </div>
                
                {/* Timeline Section */}
                <div className="lg:col-span-7">
                    <ItineraryTimeline itineraryId={itineraryId} />
                </div>
            </div>
        </div>
    );
}