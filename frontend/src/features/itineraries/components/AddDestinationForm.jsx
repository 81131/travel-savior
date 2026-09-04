import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDestinations, useAddItineraryItem } from '../hooks/useItineraries';

const schema = z.object({
    destinationId: z.number().min(1, "Please select a destination"),
    visitDate: z.string().min(1, "Please select a date"),
    startTime: z.string().min(1, "Please select a start time")
});

export default function AddDestinationForm({ itineraryId }) {
    const { data: destinations, isLoading } = useDestinations();
    const mutation = useAddItineraryItem();
    const [backendError, setBackendError] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { destinationId: 0 }
    });

    const onSubmit = (data) => {
        setBackendError(null);
        
        // Add default itinerary ID for the MVP
        // Fix: .NET TimeSpan requires "HH:mm:ss" format, but HTML time input gives "HH:mm".
        // Append ":00" for seconds so the backend can correctly parse it.
        const payload = { 
            ...data, 
            itineraryId,
            startTime: data.startTime.length === 5 ? `${data.startTime}:00` : data.startTime
        };
        
        mutation.mutate(payload, {
            onSuccess: () => {
                reset();
            },
            onError: (error) => {
                // Safely extract the exact C# exception message we threw in the backend
                const message = error.response?.data?.message || "Failed to add destination to itinerary.";
                setBackendError(message);
            }
        });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Plan Your Day</h3>
            
            {/* Backend Validation Alert Panel */}
            {backendError && (
                <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm animate-pulse">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <span className="text-amber-500 text-xl">⚠️</span>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-bold text-amber-800">Schedule Conflict</h3>
                            <div className="mt-1 text-sm text-amber-700 font-medium">{backendError}</div>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Destination</label>
                    <select {...register("destinationId", { valueAsNumber: true })} className="border-2 border-gray-200 p-3.5 w-full rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 font-medium text-gray-800 transition-all bg-white">
                        <option value={0}>-- Select a Sri Lankan Landmark --</option>
                        {destinations?.map(dest => (
                            <option key={dest.id} value={dest.id}>
                                {dest.name} ({dest.district}) • Requires {Math.floor(dest.typicalDurationMinutes / 60)}h
                            </option>
                        ))}
                    </select>
                    {errors.destinationId && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.destinationId.message}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Visit Date</label>
                        <input type="date" min={today} {...register("visitDate")} className="border-2 border-gray-200 p-3.5 w-full rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 font-medium text-gray-800 transition-all" />
                        {errors.visitDate && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.visitDate.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Start Time</label>
                        <input type="time" {...register("startTime")} className="border-2 border-gray-200 p-3.5 w-full rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 font-medium text-gray-800 transition-all" />
                        {errors.startTime && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.startTime.message}</span>}
                    </div>
                </div>

                <button type="submit" disabled={mutation.isPending || isLoading} className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-extrabold text-lg px-4 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 transition-all transform active:scale-95 mt-4">
                    {mutation.isPending ? "Validating Schedule..." : "Add to Itinerary"}
                </button>
            </form>
        </div>
    );
}