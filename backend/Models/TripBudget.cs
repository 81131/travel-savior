using System.Collections.Generic;

namespace backend.Models
{
    public class TripBudget
    {
        public long Id { get; set; }
        public string TripName { get; set; } = "My Sri Lanka Trip";
        public decimal MaxBudgetLKR { get; set; }
        public bool LocalPriceMode { get; set; } = true; // True = Local citizen pricing, False = Foreigner pricing
        
        public ICollection<ExpenseItem> Expenses { get; set; } = new List<ExpenseItem>();
    }
}