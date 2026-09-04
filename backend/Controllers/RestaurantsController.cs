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
    public class RestaurantsController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;

        public RestaurantsController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RestaurantDto>>> GetAllRestaurants()
        {
            return Ok(await _restaurantService.GetAllRestaurantsAsync());
        }

        // GET: api/restaurants/reservations
        [HttpGet("reservations")]
        public async Task<ActionResult<IEnumerable<ReservationDto>>> GetReservations()
        {
            return Ok(await _restaurantService.GetAllReservationsAsync());
        }

        [HttpPost("reservations")]
        public async Task<ActionResult<ReservationDto>> CreateReservation([FromBody] CreateReservationDto dto)
        {
            try
            {
                var result = await _restaurantService.CreateReservationAsync(dto);
                return Created($"/api/restaurants/reservations/{result.Id}", result); 
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT: api/restaurants/reservations/5
        [HttpPut("reservations/{id}")]
        public async Task<ActionResult<ReservationDto>> UpdateReservation(long id, [FromBody] UpdateReservationDto dto)
        {
            try
            {
                var result = await _restaurantService.UpdateReservationAsync(id, dto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // DELETE: api/restaurants/reservations/5
        [HttpDelete("reservations/{id}")]
        public async Task<ActionResult> DeleteReservation(long id)
        {
            var success = await _restaurantService.DeleteReservationAsync(id);
            if (!success) return NotFound(new { message = "Reservation not found." });
            return NoContent(); // 204 No Content for successful deletion
        }
    }
}