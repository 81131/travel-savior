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
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto dto)
        {
            try
            {
                var result = await _authService.RegisterAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
        {
            try
            {
                var result = await _authService.LoginAsync(dto);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // --- ADMIN CUSTOMER MANAGEMENT ENDPOINTS ---
        [HttpGet("admin/customers")]
        public async Task<ActionResult<IEnumerable<UserProfileDto>>> GetCustomers()
        {
            return Ok(await _authService.GetAllCustomersAsync());
        }

        [HttpPut("admin/customers/{id}")]
        public async Task<ActionResult<UserProfileDto>> UpdateCustomer(long id, [FromBody] UpdateUserDto dto)
        {
            try
            {
                return Ok(await _authService.UpdateCustomerAsync(id, dto));
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpDelete("admin/customers/{id}")]
        public async Task<ActionResult> DeleteCustomer(long id)
        {
            var success = await _authService.DeleteCustomerAsync(id);
            if (!success) return NotFound(new { message = "Customer not found." });
            return NoContent();
        }
    }
}