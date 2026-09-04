import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSaveTransportPlan, useMyPlans, useDeleteTransportPlan } from '../hooks/useTransport';
import { useEffect } from 'react';

const schema = z.object({
    transportRouteId: z.number().min(1, "Please select a transport option first"),
    travelerName: z.string().trim().min(2, "Name must be at least 2 characters"),
    travelDate: z.string().min(1, "Please select a travel date").refine((dateStr) => {
        return new Date(dateStr) > new Date();
    }, { message: "Travel date must be in the future" })
});

export default function SaveTransportForm({ selectedRouteId }) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { transportRouteId: selectedRouteId || 0 }
    });

    const mutation = useSaveTransportPlan();
    const deleteMutation = useDeleteTransportPlan();
    const { data: myPlans, isLoading: plansLoading } = useMyPlans();

    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        if (selectedRouteId) setValue('transportRouteId', selectedRouteId);
    }, [selectedRouteId, setValue]);

    const onSubmit = (data) => {
        mutation.mutate(data, {
            onSuccess: () => {
                alert("🎉 Transport plan saved successfully!");
                reset();
            }
        });
    };

    const handleDelete = (planId) => {
        if (!window.confirm("Delete this saved plan?")) return;
        deleteMutation.mutate(planId);
    };

    const today = new Date();
    const minDateTime = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    return (
        <div className="space-y-6">
            {/* ── Save Form ── */}
            {!selectedRouteId ? (
                <div className="p-8 border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/50 text-indigo-800 shadow-sm font-medium text-center transition-all">
                    Select a transport route from the matrix to save it to your itinerary.
                </div>
            ) : (
                <div className="p-6 rounded-2xl shadow-xl bg-white border border-gray-100 relative overflow-hidden">
                    {/* Decorative modern gradient accent */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                    
                    <h3 className="text-2xl font-extrabold mb-6 text-gray-800 tracking-tight">Save Your Trip</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Traveler Name</label>
                            <input {...register("travelerName")} className="border-2 border-gray-200 p-3 w-full rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all" placeholder="Enter your name" />
                            {errors.travelerName && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.travelerName.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Travel Date &amp; Time</label>
                            <input type="datetime-local" min={minDateTime} {...register("travelDate")} className="border-2 border-gray-200 p-3 w-full rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                            {errors.travelDate && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.travelDate.message}</span>}
                        </div>

                        <button type="submit" disabled={mutation.isPending} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-4 py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg disabled:opacity-50 transition-all transform active:scale-95">
                            {mutation.isPending ? "Saving to Itinerary..." : "Confirm & Save Plan"}
                        </button>
                    </form>
                </div>
            )}

            {/* ── My Saved Plans (only for logged-in users) ── */}
            {isLoggedIn && (
                <div className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                    <h3 className="text-xl font-extrabold mb-4 text-gray-800 tracking-tight">My Saved Plans</h3>

                    {plansLoading && (
                        <div className="animate-pulse space-y-2">
                            <div className="h-14 bg-gray-100 rounded-xl"></div>
                            <div className="h-14 bg-gray-100 rounded-xl"></div>
                        </div>
                    )}

                    {!plansLoading && (!myPlans || myPlans.length === 0) && (
                        <p className="text-gray-400 font-medium text-sm text-center py-4">
                            No saved plans yet. Save a route above!
                        </p>
                    )}

                    <div className="space-y-3">
                        {myPlans?.map((plan) => (
                            <div key={plan.id} className="flex items-center justify-between bg-gray-50 border border-gray-100 p-4 rounded-xl hover:shadow-sm transition-shadow">
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">Route #{plan.transportRouteId}</p>
                                    <p className="text-gray-500 text-xs font-medium mt-0.5">
                                        👤 {plan.travelerName} · 📅 {new Date(plan.travelDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(plan.id)}
                                    disabled={deleteMutation.isPending}
                                    className="ml-4 flex-shrink-0 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 font-bold text-xs px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                                    title="Delete this plan"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!isLoggedIn && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium text-center">
                    🔒 <a href="/login" className="font-bold underline">Log in</a> to save plans and view your history.
                </div>
            )}
        </div>
    );
}