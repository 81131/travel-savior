using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    // Output shape for budget summary calculations
    public record TripBudgetDto(
        long Id, 
        string TripName, 
        decimal MaxBudgetLKR, 
        bool LocalPriceMode, 
        decimal TotalSpentLKR, 
        decimal RemainingBudgetLKR, 
        bool IsOverBudget
    );

    // Output shape for individual expense items
    public record ExpenseItemDto(long Id, long TripBudgetId, string Category, string Description, decimal AmountLKR, int DayNumber);

    // INPUT DTO: Adding an expense with strict validation
    public class CreateExpenseDto
    {
        [Required]
        public long TripBudgetId { get; set; }

        [Required(ErrorMessage = "Category is required.")]
        [StringLength(50)]
        public string Category { get; set; } = string.Empty; // Transport, Food, Accommodation, Activity

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(200)]
        public string Description { get; set; } = string.Empty;

        [Range(1, 1000000, ErrorMessage = "Amount must be greater than 0 LKR.")]
        public decimal AmountLKR { get; set; }

        [Range(1, 30, ErrorMessage = "Day number must be between 1 and 30.")]
        public int DayNumber { get; set; } = 1;
    }

    // INPUT DTO: Updating master budget settings & local pricing toggle
    public class UpdateBudgetSettingsDto
    {
        [Range(1000, 10000000, ErrorMessage = "Budget limit must be a realistic amount.")]
        public decimal MaxBudgetLKR { get; set; }
        
        public bool LocalPriceMode { get; set; }
    }
}