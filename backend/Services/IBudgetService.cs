using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;

namespace backend.Services
{
    public interface IBudgetService
    {
        Task<TripBudgetDto> GetBudgetSummaryAsync(long tripBudgetId);
        Task<TripBudgetDto> UpdateSettingsAsync(long tripBudgetId, UpdateBudgetSettingsDto dto);
        Task<IEnumerable<ExpenseItemDto>> GetExpensesAsync(long tripBudgetId);
        Task<ExpenseItemDto> AddExpenseAsync(CreateExpenseDto dto);
        Task<bool> DeleteExpenseAsync(long expenseId);
    }
}