# Travel Savior 🌍✈️

Travel Savior is a comprehensive travel planning application developed for the SE3090 Software Engineering Frameworks Mini Hackathon. It helps users manage their travel itineraries, budgets, transportation, and restaurant bookings all in one place.

## 🚀 Tech Stack

### Backend
- **Framework:** .NET 8 (ASP.NET Core Web API)
- **Database:** PostgreSQL
- **ORM:** Entity Framework Core
- **Authentication:** JWT (JSON Web Tokens) with Role-Based Access Control
- **Documentation:** Swagger UI

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** (Add your styling framework here, e.g., Tailwind CSS, Material UI)

## 📂 Project Structure

```
travel-savior/
│
├── backend/          # .NET 8 Web API
│   ├── Controllers/  # API Endpoints
│   ├── Services/     # Business Logic (Itinerary, Budget, Transport, Restaurants)
│   ├── Models/       # Database Entities
│   ├── Dtos/         # Data Transfer Objects
│   └── Data/         # Entity Framework DbContext
│
└── frontend/         # React application (Vite)
```

## 🛠️ Setup Instructions

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/download/)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up your PostgreSQL database and update the connection string.
   - For local development, update the `DefaultConnection` in `appsettings.json`.
   - For production/deployment (e.g., Railway), set the `DATABASE_URL` environment variable.
3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```
4. Run the backend server:
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5000` (or `https://localhost:5001`), and you can view the Swagger documentation at `/swagger`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## ☁️ Deployment

This project is configured to be easily deployed to platforms like **Railway**.

- **Backend:** The `Program.cs` is configured to automatically parse Railway's `DATABASE_URL` environment variable for seamless PostgreSQL integration. Make sure the Start Command in Railway is left blank (Nixpacks will automatically use the correct build output).
- **Frontend:** Can be deployed to Vercel, Netlify, or Railway using standard Node.js build commands (`npm run build`).

