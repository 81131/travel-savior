using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class BudgetService : IBudgetService
    {
        private readonly ApplicationDbContext _context;

        public BudgetService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TripBudgetDto> GetBudgetSummaryAsync(long tripBudgetId)
        {
            var budget = await _context.TripBudgets
                .Include(b => b.Expenses)
                .FirstOrDefaultAsync(b => b.Id == tripBudgetId);

            if (budget == null) throw new ArgumentException("Trip budget not found.");

            decimal totalSpent = budget.Expenses.Sum(e => e.AmountLKR);
            decimal remaining = budget.MaxBudgetLKR - totalSpent;
            bool isOver = totalSpent > budget.MaxBudgetLKR;

            return new TripBudgetDto(budget.Id, budget.TripName, budget.MaxBudgetLKR, budget.LocalPriceMode, totalSpent, remaining, isOver);
        }

        public async Task<TripBudgetDto> UpdateSettingsAsync(long tripBudgetId, UpdateBudgetSettingsDto dto)
        {
            var budget = await _context.TripBudgets
                .Include(b => b.Expenses)
                .FirstOrDefaultAsync(b => b.Id == tripBudgetId);

            if (budget == null) throw new ArgumentException("Trip budget not found.");

            budget.MaxBudgetLKR = dto.MaxBudgetLKR;
            budget.LocalPriceMode = dto.LocalPriceMode;

            await _context.SaveChangesAsync();

            decimal totalSpent = budget.Expenses.Sum(e => e.AmountLKR);
            decimal remaining = budget.MaxBudgetLKR - totalSpent;
            bool isOver = totalSpent > budget.MaxBudgetLKR;

            return new TripBudgetDto(budget.Id, budget.TripName, budget.MaxBudgetLKR, budget.LocalPriceMode, totalSpent, remaining, isOver);
        }

        public async Task<IEnumerable<ExpenseItemDto>> GetExpensesAsync(long tripBudgetId)
        {
            return await _context.ExpenseItems
                .Where(e => e.TripBudgetId == tripBudgetId)
                .OrderBy(e => e.DayNumber)
                .Select(e => new ExpenseItemDto(e.Id, e.TripBudgetId, e.Category, e.Description, e.AmountLKR, e.DayNumber))
                .ToListAsync();
        }

        public async Task<ExpenseItemDto> AddExpenseAsync(CreateExpenseDto dto)
        {
            var budget = await _context.TripBudgets.FindAsync(dto.TripBudgetId);
            if (budget == null) throw new ArgumentException("Trip budget not found.");

            var expense = new ExpenseItem
            {
                TripBudgetId = dto.TripBudgetId,
                Category = dto.Category,
                Description = dto.Description,
                AmountLKR = dto.AmountLKR,
                DayNumber = dto.DayNumber
            };

            _context.ExpenseItems.Add(expense);
            await _context.SaveChangesAsync();

            return new ExpenseItemDto(expense.Id, expense.TripBudgetId, expense.Category, expense.Description, expense.AmountLKR, expense.DayNumber);
        }

        public async Task<bool> DeleteExpenseAsync(long expenseId)
        {
            var expense = await _context.ExpenseItems.FindAsync(expenseId);
            if (expense == null) return false;

            _context.ExpenseItems.Remove(expense);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}