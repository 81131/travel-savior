namespace backend.Models
{
    public class ExpenseItem
    {
        public long Id { get; set; }
        
        public long TripBudgetId { get; set; }
        public TripBudget? TripBudget { get; set; }

        public string Category { get; set; } = string.Empty; // "Transport", "Food", "Accommodation", "Activity"
        public string Description { get; set; } = string.Empty;
        public decimal AmountLKR { get; set; }
        public int DayNumber { get; set; } = 1;
    }
}