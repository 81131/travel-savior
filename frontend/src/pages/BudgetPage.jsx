import BudgetSummaryCard from '../features/budget/components/BudgetSummaryCard';
import AddExpenseForm from '../features/budget/components/AddExpenseForm';
import ExpenseList from '../features/budget/components/ExpenseList';

export default function BudgetPage() {
    const tripBudgetId = 1; // Master trip budget ID for MVP

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            {/* Header Banner */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-[2rem] p-10 md:p-14 mb-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight relative z-10">Smart Trip Budget Planner</h1>
                <p className="text-emerald-100 text-lg md:text-xl font-medium max-w-2xl relative z-10 leading-relaxed">
                    Track daily expenses, manage dual-tier pricing for Sri Lanka, and prevent overspending with real-time calculations.
                </p>
            </div>
            
            {/* Summary Card Full Width */}
            <div className="mb-10">
                <BudgetSummaryCard tripBudgetId={tripBudgetId} />
            </div>

            {/* Form and List Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                    <div className="sticky top-24">
                        <AddExpenseForm tripBudgetId={tripBudgetId} />
                    </div>
                </div>
                
                <div className="lg:col-span-7">
                    <ExpenseList tripBudgetId={tripBudgetId} />
                </div>
            </div>
        </div>
    );
}