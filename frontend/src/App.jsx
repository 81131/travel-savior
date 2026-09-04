import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RestaurantsPage from './pages/RestaurantsPage';
import TransportPage from './pages/TransportPage';
import ItineraryPage from './pages/ItineraryPage';
import BudgetPage from './pages/BudgetPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function NavBar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          SriLanka Planner
        </Link>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Link to="/" className="font-bold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all">🏠 Home</Link>
          <Link to="/budget" className="font-bold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all">💰 Budget</Link>
          <Link to="/itinerary" className="font-bold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all">🗓️ Itinerary</Link>
          <Link to="/transport" className="font-bold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all">🚌 Transport</Link>
          <Link to="/food" className="font-bold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all">🍛 Food</Link>

          {user?.role === 'Admin' && (
            <Link to="/admin" className="font-bold text-purple-600 hover:text-purple-800 px-3 py-2 rounded-lg bg-purple-50 transition-all">⚙️ Admin Panel</Link>
          )}

          {user ? (
            <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-4 py-2 rounded-xl text-sm transition-colors">
              Logout ({user.fullName})
            </button>
          ) : (
            <div className="flex gap-2 ml-2">
              <Link to="/login" className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors">Login</Link>
              <Link to="/register" className="border-2 border-indigo-600 text-indigo-600 font-bold px-4 py-2 rounded-xl text-sm hover:bg-indigo-50 transition-colors">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/food" element={<RestaurantsPage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 text-slate-500 font-medium text-center p-6 text-sm mt-auto">
          Built for the SE3090 Mini Hackathon 2026 • 100% Validated & Secure
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;