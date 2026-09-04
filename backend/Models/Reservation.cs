using System;

namespace backend.Models
{
    public class Reservation
    {
        public long Id { get; set; }
        
        // Foreign Key to the Restaurant
        public long RestaurantId { get; set; }
        public Restaurant? Restaurant { get; set; }
        
        // Reservation Details
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public int GuestCount { get; set; }
        public DateTime ReservationTime { get; set; }
    }
}