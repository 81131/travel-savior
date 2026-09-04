using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _budgetService;

        public BudgetController(IBudgetService budgetService)
        {
            _budgetService = budgetService;
        }

        // GET: api/budget/1
        [HttpGet("{id}")]
        public async Task<ActionResult<TripBudgetDto>> GetSummary(long id)
        {
            try
            {
                return Ok(await _budgetService.GetBudgetSummaryAsync(id));
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // PUT: api/budget/1/settings
        [HttpPut("{id}/settings")]
        public async Task<ActionResult<TripBudgetDto>> UpdateSettings(long id, [FromBody] UpdateBudgetSettingsDto dto)
        {
            try
            {
                return Ok(await _budgetService.UpdateSettingsAsync(id, dto));
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // GET: api/budget/1/expenses
        [HttpGet("{id}/expenses")]
        public async Task<ActionResult<IEnumerable<ExpenseItemDto>>> GetExpenses(long id)
        {
            return Ok(await _budgetService.GetExpensesAsync(id));
        }

        // POST: api/budget/expenses
        [HttpPost("expenses")]
        public async Task<ActionResult<ExpenseItemDto>> AddExpense([FromBody] CreateExpenseDto dto)
        {
            try
            {
                var result = await _budgetService.AddExpenseAsync(dto);
                return Created($"/api/budget/{result.TripBudgetId}/expenses", result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/budget/expenses/5
        [HttpDelete("expenses/{id}")]
        public async Task<ActionResult> DeleteExpense(long id)
        {
            var success = await _budgetService.DeleteExpenseAsync(id);
            if (!success) return NotFound(new { message = "Expense not found." });
            return NoContent();
        }
    }
}