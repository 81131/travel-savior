import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
            
            {/* HERO SECTION */}
            <div className="relative overflow-hidden pt-20 pb-28">
                {/* Glowing background gradient blur */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-extrabold uppercase tracking-widest mb-6">
                        ✨ SE3090 Enterprise-Grade Solution • 2026 Edition
                    </span>
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8">
                        Experience Sri Lanka <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Intelligently Planned
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        The ultimate full-stack travel platform featuring real-time transit comparison, automated itinerary schedule bouncers, dual-tier pricing budgets, and authentic food discovery.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/register" className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5">
                            Get Started Free 🚀
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold px-8 py-4 rounded-2xl transition-all">
                            Sign In to Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* FEATURES GRID SECTION */}
            <div className="container mx-auto px-6 py-20 border-t border-slate-900">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Powered by Advanced Engineering</h2>
                    <p className="text-slate-400 font-medium">Built with React, ASP.NET Core, and PostgreSQL to solve real Sri Lankan travel friction points.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Feature 1 */}
                    <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl hover:border-indigo-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            🚌
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Smart Transport</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">Compare train, bus, and taxi options with automated cheapest & fastest badge calculation.</p>
                        <Link to="/transport" className="text-indigo-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                            Explore Matrix →
                        </Link>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl hover:border-teal-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            🗓️
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Smart Itinerary</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">Opening-time checks and schedule conflict bouncers that block unrealistic daily plans.</p>
                        <Link to="/itinerary" className="text-teal-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                            Build Schedule →
                        </Link>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl hover:border-emerald-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            💰
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Expense Planner</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">Dual-tier local pricing toggles, real-time remaining calculations, and over-budget warnings.</p>
                        <Link to="/budget" className="text-emerald-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                            Track Budget →
                        </Link>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl hover:border-purple-500/50 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            🍛
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Food Discovery</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">Authentic Sri Lankan food discovery with full CRUD reservation management and Zod validation.</p>
                        <Link to="/food" className="text-purple-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                            Find Bites →
                        </Link>
                    </div>

                </div>
            </div>

            {/* FOOTER */}
            <footer className="border-t border-slate-900 py-10 text-center text-slate-500 text-sm">
                <p>Designed & Built for SE3090 Mini Hackathon 2026 • Zero-Error Architecture</p>
            </footer>
        </div>
    );
}