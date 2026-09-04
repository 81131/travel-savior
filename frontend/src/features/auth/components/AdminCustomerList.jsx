import { useState } from 'react';
import { useCustomers, useUpdateCustomer, useDeleteCustomer } from '../hooks/useAuth';

export default function AdminCustomerList() {
    const { data: customers, isLoading, error } = useCustomers();
    const updateMutation = useUpdateCustomer();
    const deleteMutation = useDeleteCustomer();

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');

    if (isLoading) return <div className="p-8 text-center text-indigo-600 font-bold animate-pulse">Loading customer profiles...</div>;
    if (error) return <div className="p-8 text-center text-red-500 font-bold">Failed to load customers.</div>;

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this customer profile?")) {
            deleteMutation.mutate(id);
        }
    };

    const startEdit = (cust) => {
        setEditingId(cust.id);
        setEditName(cust.fullName);
        setEditPhone(cust.phoneNumber);
    };

    const saveEdit = (id) => {
        updateMutation.mutate({
            id,
            data: { fullName: editName, phoneNumber: editPhone }
        }, {
            onSuccess: () => setEditingId(null)
        });
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl my-8">
            <div className="bg-gradient-to-r from-gray-900 to-indigo-900 p-8 rounded-3xl text-white shadow-xl mb-8">
                <h1 className="text-3xl font-black">Admin Dashboard — Customer Profiles</h1>
                <p className="text-indigo-200 text-sm mt-1">Manage registered customer accounts securely (Full CRUD).</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 text-xs font-extrabold uppercase">
                            <th className="p-4">ID</th>
                            <th className="p-4">Full Name</th>
                            <th className="p-4">Gmail</th>
                            <th className="p-4">Phone Number</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {customers?.map((cust) => (
                            <tr key={cust.id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="p-4 font-bold text-gray-500">#{cust.id}</td>
                                <td className="p-4 font-semibold text-gray-900">
                                    {editingId === cust.id ? (
                                        <input value={editName} onChange={(e) => setEditName(e.target.value)} className="border p-2 rounded-xl w-full" />
                                    ) : cust.fullName}
                                </td>
                                <td className="p-4 text-gray-600">{cust.email}</td>
                                <td className="p-4 font-medium text-gray-700">
                                    {editingId === cust.id ? (
                                        <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="border p-2 rounded-xl w-full" />
                                    ) : cust.phoneNumber}
                                </td>
                                <td className="p-4 text-right">
                                    {editingId === cust.id ? (
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => saveEdit(cust.id)} className="bg-green-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold">Save</button>
                                            <button onClick={() => setEditingId(null)} className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-xl text-xs font-bold">Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => startEdit(cust)} className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(cust.id)} className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">Delete</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {customers?.length === 0 && (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-400 font-medium">No registered customers found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}