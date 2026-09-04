import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAddExpense } from '../hooks/useBudget';

const schema = z.object({
    category: z.string().min(1, "Please select a category"),
    description: z.string().min(2, "Description must be at least 2 characters"),
    amountLKR: z.number({ invalid_type_error: "Must be a valid number" }).min(1, "Amount must be greater than 0"),
    dayNumber: z.number().min(1, "Day must be at least 1").max(30, "Max 30 days")
});

export default function AddExpenseForm({ tripBudgetId }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { category: 'Transport', dayNumber: 1, amountLKR: 1000 }
    });

    const mutation = useAddExpense();

    const onSubmit = (data) => {
        const payload = { ...data, tripBudgetId };
        mutation.mutate(payload, {
            onSuccess: () => reset()
        });
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Add Expense</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                    <select {...register("category")} className="border-2 border-gray-200 p-3.5 w-full rounded-xl font-medium text-gray-800 bg-white focus:border-emerald-500 outline-none transition-all">
                        <option value="Transport">🚌 Transport</option>
                        <option value="Food">🍛 Food & Dining</option>
                        <option value="Accommodation">🏨 Accommodation</option>
                        <option value="Activity">🎟️ Activity & Entrance Fee</option>
                    </select>
                    {errors.category && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.category.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                    <input {...register("description")} placeholder="e.g. Train ticket Kandy to Ella" className="border-2 border-gray-200 p-3.5 w-full rounded-xl font-medium text-gray-800 focus:border-emerald-500 outline-none transition-all" />
                    {errors.description && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.description.message}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Amount (LKR)</label>
                        <input type="number" min="1" {...register("amountLKR", { valueAsNumber: true })} className="border-2 border-gray-200 p-3.5 w-full rounded-xl font-medium text-gray-800 focus:border-emerald-500 outline-none transition-all" />
                        {errors.amountLKR && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.amountLKR.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Trip Day</label>
                        <input type="number" min="1" max="30" {...register("dayNumber", { valueAsNumber: true })} className="border-2 border-gray-200 p-3.5 w-full rounded-xl font-medium text-gray-800 focus:border-emerald-500 outline-none transition-all" />
                        {errors.dayNumber && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.dayNumber.message}</span>}
                    </div>
                </div>

                <button type="submit" disabled={mutation.isPending} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-lg px-4 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 transition-all transform active:scale-95 mt-4">
                    {mutation.isPending ? "Recording Expense..." : "Add Expense"}
                </button>
            </form>
        </div>
    );
}