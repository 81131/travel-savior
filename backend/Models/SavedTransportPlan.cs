using System;

namespace backend.Models
{
    public class SavedTransportPlan
    {
        public long Id { get; set; }
        
        public long TransportRouteId { get; set; }
        public TransportRoute? TransportRoute { get; set; }
        
        public string TravelerName { get; set; } = string.Empty;
        public DateTime TravelDate { get; set; }

        // Nullable: plans saved by anonymous users will have null UserId
        public long? UserId { get; set; }
        public User? User { get; set; }
    }
}