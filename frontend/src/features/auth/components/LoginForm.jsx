import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

export default function LoginForm() {
    const [authError, setAuthError] = useState(null);
    const mutation = useLogin();
    const useNavigateInstance = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        setAuthError(null);
        mutation.mutate(data, {
            onSuccess: (res) => {
                alert(`Welcome back, ${res.fullName}!`);
                if (res.role === 'Admin') {
                    useNavigateInstance('/admin');
                } else {
                    useNavigateInstance('/');
                }
            },
            onError: () => {
                setAuthError("Invalid email or password.");
            }
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 my-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-6 text-sm">Login to your planner account.</p>

            <div className="mb-4 bg-indigo-50 p-3 rounded-xl text-xs font-semibold text-indigo-800">
                💡 <span className="font-bold">Admin Demo Credentials:</span> admin@planner.lk / Admin@123
            </div>

            {authError && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold">{authError}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Gmail Address</label>
                    <input {...register("email")} placeholder="admin@planner.lk" className="border-2 border-gray-200 p-3 w-full rounded-xl focus:border-indigo-500 outline-none font-medium" />
                    {errors.email && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                    <input type="password" {...register("password")} placeholder="••••••••" className="border-2 border-gray-200 p-3 w-full rounded-xl focus:border-indigo-500 outline-none font-medium" />
                    {errors.password && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.password.message}</span>}
                </div>

                <button type="submit" disabled={mutation.isPending} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    {mutation.isPending ? "Authenticating..." : "Login"}
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Register</Link>
            </p>
        </div>
    );
}