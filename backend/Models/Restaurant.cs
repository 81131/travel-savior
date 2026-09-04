namespace backend.Models
{
    public class Restaurant
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string CuisineType { get; set; } = string.Empty; // e.g., "Kottu", "Rice & Curry"
        public decimal AveragePrice { get; set; }
        public string OpeningHours { get; set; } = string.Empty;
    }
}