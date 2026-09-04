namespace backend.Models
{
    public class TransportRoute
    {
        public long Id { get; set; }
        public string Origin { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;
        public string TransportMode { get; set; } = string.Empty; // e.g., "Bus", "Train", "Tuk-Tuk", "Taxi"
        public decimal EstimatedCostLKR { get; set; }
        public int EstimatedDurationMinutes { get; set; }
        public decimal DistanceKm { get; set; }
    }
}