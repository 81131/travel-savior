import { useState } from 'react';
import { useBudgetSummary, useUpdateBudgetSettings } from '../hooks/useBudget';

export default function BudgetSummaryCard({ tripBudgetId }) {
    const { data: summary, isLoading, error } = useBudgetSummary(tripBudgetId);
    const updateSettingsMutation = useUpdateBudgetSettings();

    const [isEditing, setIsEditing] = useState(false);
    const [maxBudget, setMaxBudget] = useState('');
    const [localMode, setLocalMode] = useState(true);

    if (isLoading) return <div className="p-8 bg-white rounded-3xl animate-pulse h-48">Loading financial metrics...</div>;
    if (error) return <div className="p-4 bg-red-50 text-red-600 rounded-2xl font-bold">Failed to load budget overview.</div>;

    const percentageSpent = summary.maxBudgetLKR > 0 ? Math.min(Math.round((summary.totalSpentLKR / summary.maxBudgetLKR) * 100), 100) : 0;

    const handleOpenEdit = () => {
        setMaxBudget(summary.maxBudgetLKR);
        setLocalMode(summary.localPriceMode);
        setIsEditing(true);
    };

    const handleSaveSettings = (e) => {
        e.preventDefault();
        updateSettingsMutation.mutate({
            id: tripBudgetId,
            data: { maxBudgetLKR: Number(maxBudget), localPriceMode: localMode }
        }, {
            onSuccess: () => setIsEditing(false)
        });
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Top gradient bar */}
            <div className={`absolute top-0 left-0 w-full h-2 ${summary.isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r from-emerald-500 to-teal-600'}`}></div>

            {/* Over-Budget Warning Banner */}
            {summary.isOverBudget && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm animate-pulse">
                    <div className="flex items-center">
                        <span className="text-red-500 text-2xl mr-3">🚨</span>
                        <div>
                            <h4 className="text-sm font-extrabold text-red-800">Budget Exceeded!</h4>
                            <p className="text-xs text-red-700 font-medium">Your planned expenses have crossed your maximum limit.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        {summary.localPriceMode ? "🇱🇰 Sri Lankan Citizen Mode" : "🌍 Foreign Tourist Mode"}
                    </span>
                    <h2 className="text-3xl font-black text-gray-900 mt-2">{summary.tripName}</h2>
                </div>
                <button onClick={handleOpenEdit} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-xl transition-all">
                    ⚙️ Configure Limit
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={handleSaveSettings} className="bg-slate-50 p-5 rounded-2xl mb-6 space-y-4 border border-slate-200">
                    <h4 className="font-bold text-gray-800 text-sm">Update Budget Settings</h4>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Max Budget Limit (LKR)</label>
                        <input type="number" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} className="border p-2 w-full rounded-xl bg-white font-bold" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="localMode" checked={localMode} onChange={(e) => setLocalMode(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded" />
                        <label htmlFor="localMode" className="text-xs font-bold text-gray-700">Use Local Pricing Tiers</label>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-700">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            ) : null}

            {/* Financial Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase">Max Budget</p>
                    <p className="text-2xl font-black text-gray-900 mt-1">LKR {summary.maxBudgetLKR.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase">Total Spent</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">LKR {summary.totalSpentLKR.toLocaleString()}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${summary.remainingBudgetLKR < 0 ? 'bg-red-50 border-red-100' : 'bg-teal-50 border-teal-100'}`}>
                    <p className={`text-xs font-bold uppercase ${summary.remainingBudgetLKR < 0 ? 'text-red-600' : 'text-teal-600'}`}>Remaining</p>
                    <p className={`text-2xl font-black mt-1 ${summary.remainingBudgetLKR < 0 ? 'text-red-700' : 'text-teal-800'}`}>
                        LKR {summary.remainingBudgetLKR.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div>
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-2">
                    <span>Budget Utilization</span>
                    <span>{percentageSpent}%</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 rounded-full ${summary.isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`} style={{ width: `${percentageSpent}%` }}></div>
                </div>
            </div>
        </div>
    );
}