import { useExpenses, useDeleteExpense } from '../hooks/useBudget';

export default function ExpenseList({ tripBudgetId }) {
    const { data: expenses, isLoading, error } = useExpenses(tripBudgetId);
    const deleteMutation = useDeleteExpense(tripBudgetId);

    if (isLoading) return <div className="p-6 bg-white rounded-3xl animate-pulse">Loading expenses...</div>;
    if (error) return <div className="text-red-500 font-bold p-4">Error loading expense records.</div>;

    if (!expenses || expenses.length === 0) {
        return (
            <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center">
                <p className="text-4xl mb-3">💰</p>
                <h4 className="text-xl font-bold text-gray-800">No expenses recorded yet</h4>
                <p className="text-gray-500 text-sm mt-1">Add your transport, food, and hotel costs using the form.</p>
            </div>
        );
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Recorded Expenses</h3>
            
            <div className="space-y-4">
                {expenses.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-all gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                                    Day {item.dayNumber}
                                </span>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                    {item.category}
                                </span>
                            </div>
                            <h4 className="font-extrabold text-gray-900 text-lg">{item.description}</h4>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <span className="text-xl font-black text-emerald-600">
                                LKR {item.amountLKR.toLocaleString()}
                            </span>
                            <button 
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl transition-colors font-bold text-sm"
                                title="Delete Expense"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}