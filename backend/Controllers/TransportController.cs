using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransportController : ControllerBase
    {
        private readonly ITransportService _transportService;

        public TransportController(ITransportService transportService)
        {
            _transportService = transportService;
        }

        // GET: api/transport/search?origin=Colombo&destination=Ella
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<TransportRouteDto>>> Search([FromQuery] string? origin, [FromQuery] string? destination)
        {
            var routes = await _transportService.SearchRoutesAsync(origin, destination);
            return Ok(routes);
        }

        // POST: api/transport/save
        // If authenticated, links the plan to the logged-in user. Anonymous users can also save.
        [HttpPost("save")]
        public async Task<ActionResult<SavedTransportPlanDto>> SavePlan([FromBody] CreateTransportPlanDto dto)
        {
            try
            {
                // Extract userId from JWT if the user is authenticated; null for anonymous
                long? userId = null;
                var subClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) 
                            ?? User.FindFirstValue("sub");
                if (subClaim != null && long.TryParse(subClaim, out var parsedId))
                {
                    userId = parsedId;
                }

                var result = await _transportService.SavePlanAsync(dto, userId);
                return Created($"/api/transport/my-plans", result);
            }
            catch (Exception ex) when (ex is ArgumentException || ex is InvalidOperationException)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Catches database exceptions (e.g., FK violation if TransportRouteId doesn't exist)
                return StatusCode(500, new { message = "Failed to save transport plan. Please ensure a valid route is selected.", detail = ex.Message });
            }
        }

        // GET: api/transport/my-plans  — AUTHENTICATED: returns only the logged-in user's plans
        [Authorize]
        [HttpGet("my-plans")]
        public async Task<ActionResult<IEnumerable<SavedTransportPlanDto>>> GetMyPlans()
        {
            var subClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) 
                        ?? User.FindFirstValue("sub");
            if (!long.TryParse(subClaim, out var userId))
                return Unauthorized(new { message = "Invalid token." });

            var plans = await _transportService.GetMyPlansAsync(userId);
            return Ok(plans);
        }

        // DELETE: api/transport/{id}  — AUTHENTICATED: only the owning user can delete their plan
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePlan(long id)
        {
            var subClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) 
                        ?? User.FindFirstValue("sub");
            if (!long.TryParse(subClaim, out var userId))
                return Unauthorized(new { message = "Invalid token." });

            var success = await _transportService.DeletePlanAsync(id, userId);
            if (!success) 
                return NotFound(new { message = "Plan not found or you are not authorized to delete it." });

            return NoContent(); // 204
        }
    }
}