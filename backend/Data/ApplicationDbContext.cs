using System;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<TransportRoute> TransportRoutes { get; set; }
        public DbSet<SavedTransportPlan> SavedTransportPlans { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Itinerary> Itineraries { get; set; }
        public DbSet<ItineraryItem> ItineraryItems { get; set; }
        public DbSet<TripBudget> TripBudgets { get; set; }
        public DbSet<ExpenseItem> ExpenseItems { get; set; }
        
        // NEW: Users Table for Authentication & Admin Management
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed previous features data...
            modelBuilder.Entity<Restaurant>().HasData(
                new Restaurant { Id = 1, Name = "Kottu Labs", Location = "Colombo 07", CuisineType = "Kottu", AveragePrice = 1500, OpeningHours = "11:00 AM - 11:00 PM" },
                new Restaurant { Id = 2, Name = "The Mango Tree", Location = "Colombo 03", CuisineType = "North Indian", AveragePrice = 3000, OpeningHours = "12:00 PM - 10:30 PM" },
                new Restaurant { Id = 3, Name = "Upali's by Nawaloka", Location = "Colombo 07", CuisineType = "Sri Lankan Rice & Curry", AveragePrice = 2000, OpeningHours = "11:30 AM - 10:30 PM" }
            );

            modelBuilder.Entity<TransportRoute>().HasData(
                new TransportRoute { Id = 1, Origin = "Colombo", Destination = "Ella", TransportMode = "Train", EstimatedCostLKR = 1200, EstimatedDurationMinutes = 540, DistanceKm = 200 },
                new TransportRoute { Id = 2, Origin = "Colombo", Destination = "Ella", TransportMode = "Taxi", EstimatedCostLKR = 25000, EstimatedDurationMinutes = 300, DistanceKm = 200 },
                new TransportRoute { Id = 3, Origin = "Kandy", Destination = "Colombo", TransportMode = "Bus", EstimatedCostLKR = 800, EstimatedDurationMinutes = 210, DistanceKm = 115 },
                new TransportRoute { Id = 4, Origin = "Kandy", Destination = "Colombo", TransportMode = "Train", EstimatedCostLKR = 600, EstimatedDurationMinutes = 180, DistanceKm = 115 },
                new TransportRoute { Id = 5, Origin = "Galle", Destination = "Colombo", TransportMode = "Bus", EstimatedCostLKR = 1000, EstimatedDurationMinutes = 90, DistanceKm = 125 }
            );

            modelBuilder.Entity<Destination>().HasData(
                new Destination { Id = 1, Name = "Sigiriya Rock Fortress", District = "Matale", OpenTime = new TimeSpan(6, 30, 0), CloseTime = new TimeSpan(17, 30, 0), TypicalDurationMinutes = 180, BestSeason = "All Year" },
                new Destination { Id = 2, Name = "Yala National Park", District = "Hambantota", OpenTime = new TimeSpan(6, 0, 0), CloseTime = new TimeSpan(18, 0, 0), TypicalDurationMinutes = 240, BestSeason = "Dec-Jul" },
                new Destination { Id = 3, Name = "Arugam Bay Surf Point", District = "Ampara", OpenTime = new TimeSpan(0, 0, 0), CloseTime = new TimeSpan(23, 59, 59), TypicalDurationMinutes = 240, BestSeason = "May-Sep" },
                new Destination { Id = 4, Name = "Mirissa Whale Watching", District = "Matara", OpenTime = new TimeSpan(6, 0, 0), CloseTime = new TimeSpan(14, 0, 0), TypicalDurationMinutes = 300, BestSeason = "Dec-Mar" }
            );

            modelBuilder.Entity<TripBudget>().HasData(
                new TripBudget { Id = 1, TripName = "Sri Lanka Explorer 2026", MaxBudgetLKR = 50000, LocalPriceMode = true }
            );

            // Seed the default Itinerary (Id=1) so the frontend MVP hardcoded itineraryId=1 has a valid FK target
            modelBuilder.Entity<Itinerary>().HasData(
                new Itinerary { Id = 1, PlanName = "My Sri Lanka Adventure" }
            );

            // NEW: Seed Pre-existing Admin User (Email: admin@planner.lk, Password: Admin@123)
            var hasher = new PasswordHasher<User>();
            var adminUser = new User
            {
                Id = 1,
                FullName = "System Administrator",
                Email = "admin@planner.lk",
                PasswordHash = hasher.HashPassword(null!, "Admin@123"),
                PhoneNumber = "0771234567",
                Role = "Admin"
            };
            modelBuilder.Entity<User>().HasData(adminUser);
        }
    }
}