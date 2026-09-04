import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegister } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const schema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid Gmail address"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 
        "Must be 8+ chars with uppercase, lowercase, number & symbol"),
    phoneNumber: z.string().regex(/^07\d{8}$/, "Enter a valid SL mobile number (e.g. 0712345678)")
});

export default function RegisterForm() {
    const [authError, setAuthError] = useState(null);
    const mutation = useRegister();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        setAuthError(null);
        mutation.mutate(data, {
            onSuccess: (res) => {
                alert(`Welcome ${res.fullName}! Registration successful.`);
                navigate(res.role === 'Admin' ? '/admin' : '/');
            },
            onError: (err) => {
                setAuthError(err.response?.data?.message || "Registration failed.");
            }
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 my-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500 mb-6 text-sm">Join Sri Lanka Smart Planner today.</p>

            {authError && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold">{authError}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input {...register("fullName")} placeholder="Kamal Perera" className="border-2 border-gray-200 p-3 w-full rounded-xl focus:border-indigo-500 outline-none font-medium" />
                    {errors.fullName && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.fullName.message}</span>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Gmail Address</label>
                    <input {...register("email")} placeholder="kamal@gmail.com" className="border-2 border-gray-200 p-3 w-full rounded-xl focus:border-indigo-500 outline-none font-medium" />
                    {errors.email && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                    <input type="password" {...register("password")} placeholder="••••••••" className="border-2 border-gray-200 p-3 w-full rounded-xl focus:border-indigo-500 outline-none font-medium" />
                    {errors.password && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.password.message}</span>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input {...register("phoneNumber")} placeholder="0712345678" className="border-2 border-gray-200 p-3 w-full rounded-xl focus:border-indigo-500 outline-none font-medium" />
                    {errors.phoneNumber && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.phoneNumber.message}</span>}
                </div>

                <button type="submit" disabled={mutation.isPending} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    {mutation.isPending ? "Creating Account..." : "Register"}
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login</Link>
            </p>
        </div>
    );
}