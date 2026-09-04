using System;

namespace backend.Models
{
    public class Destination
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public TimeSpan OpenTime { get; set; }
        public TimeSpan CloseTime { get; set; }
        public int TypicalDurationMinutes { get; set; }
        
        // E.g., "Dec-Mar" (South Coast), "May-Sep" (East Coast), "All Year"
        public string BestSeason { get; set; } = string.Empty; 
    }
}