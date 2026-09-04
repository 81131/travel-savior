using System.Collections.Generic;

namespace backend.Models
{
    public class Itinerary
    {
        public long Id { get; set; }
        public string PlanName { get; set; } = string.Empty;
        
        // A single itinerary can have many destinations attached to it
        public ICollection<ItineraryItem> Items { get; set; } = new List<ItineraryItem>();
    }
}