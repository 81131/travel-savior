using System;

namespace backend.Models
{
    public class ItineraryItem
    {
        public long Id { get; set; }
        
        public long ItineraryId { get; set; }
        public Itinerary? Itinerary { get; set; }

        public long DestinationId { get; set; }
        public Destination? Destination { get; set; }

        public DateTime VisitDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; } // Calculated dynamically: StartTime + TypicalDuration
    }
}